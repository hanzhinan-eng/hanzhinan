#!/usr/bin/env python3
# 공공데이터 자동 갱신 3종 — 복지서비스(补助) · 관광행사(本月活动) · 아파트 실거래(房价)
# 실행: APPLYHOME_KEY=키 python3 data_update.py [notice|hangang|welfare|tour|apt|all]   (--sample: 견본 데이터)
import os, sys, re, json, time, datetime, statistics, urllib.request, urllib.parse
import xml.etree.ElementTree as ET

KST = datetime.timezone(datetime.timedelta(hours=9))
TODAY = datetime.datetime.now(KST).date()
HERE = os.path.dirname(os.path.abspath(__file__))
KEY = os.environ.get("APPLYHOME_KEY", "")
SAMPLE = "--sample" in sys.argv
STAMP = f"{TODAY.year}.{TODAY.month}.{TODAY.day} 更新"

def esc(t): return str(t or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
def get(url, params, timeout=25):
    q = urllib.parse.urlencode(params)
    req = urllib.request.Request(url + "?" + q, headers={"User-Agent": "hanzhinan-bot"})
    last = None
    for attempt in range(3):   # data.go.kr는 해외에서 가끔 timeout → 3번까지 다시 시도
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read().decode("utf-8", "replace")
        except Exception as e:
            last = e; print(f"  retry {attempt + 1}/3:", e); time.sleep(3 * (attempt + 1))
    raise last
def replace_block(path, tag, body, stamp_id):
    p = os.path.join(HERE, path); html = open(p, encoding="utf-8").read()
    new = re.sub(rf"(<!-- {tag}:START -->\n).*?(<!-- {tag}:END -->)", lambda m: m.group(1) + body + m.group(2), html, flags=re.S)
    new = re.sub(rf'(<span class="today-day" id="{stamp_id}">).*?(</span>)', lambda m: m.group(1) + STAMP + m.group(2), new)
    if new != html:
        open(p, "w", encoding="utf-8").write(new); print(f"{path}: {tag} updated"); return True
    print(f"{path}: {tag} no change"); return False
def xml_items(text):
    root = ET.fromstring(text)
    code = root.findtext(".//resultCode") or root.findtext(".//returnReasonCode") or ""
    msg = root.findtext(".//resultMsg") or root.findtext(".//returnAuthMsg") or ""
    if code and code not in ("00", "0", "000", "03"):   # 03 = NODATA (정상)
        raise RuntimeError(f"API 오류 {code} {msg}")
    rows = list(root.iter("item")) or list(root.iter("servList"))   # 복지서비스 API는 <item>이 아니라 <servList>로 줌 (09-21 로그: 오류 없이 0건 → 원인)
    print("  xml:", "code=" + (code or "-"), "total=" + (root.findtext(".//totalCount") or "-"), "rows=" + str(len(rows)))
    return [{c.tag: (c.text or "").strip() for c in it} for it in rows]
def first(it, *names):   # 신·구 필드명 중 있는 것 사용
    for n in names:
        v = it.get(n)
        if v not in (None, ""): return v
    return ""
def codes_to_zh(v, table):   # "010,020" 같은 코드면 中文으로, 이미 이름이면 그대로
    parts = [x.strip() for x in str(v or "").split(",") if x.strip()]
    if parts and all(x.isdigit() for x in parts): return "·".join(table.get(x, x) for x in parts)
    return "·".join(parts)

# ---------------- 0. 한울타리 공지 (最新通知) — 열쇠 필요 없음 ----------------
# 서울시가족센터 「한울타리」 게시판 2곳의 최근 글 제목·날짜·원문 링크만. 본문은 베끼지 않고, 제목은 번역하지 않음(원문 그대로).
import html as _html
MC = "https://mcfamily.or.kr"
# 2026-10-28: 한울타리 「서울시소식」 4곳 전부 (카드뉴스만 제외 — 月亮妈妈). 중국 관련만 거르던 것(10-06)은 폐지, 대신 「中文」 표시
BOARDS = [("notice", "공지사항", "公告"), ("info", "서울의 정보", "首尔信息"), ("family", "가족센터 소식", "家庭中心消息"), ("community", "지역사회모임", "社区聚会")]
BOARD_ZH = {b: zh for b, ko, zh in BOARDS}; BOARD_ZH.update({"edu": "教育消息", "culture": "文化消息", "apply": "可报名"}); BOARD_KO = {b: ko for b, ko, zh in BOARDS}
NOTICE_DAYS = 180; NOTICE_MAX = 12   # 게시판마다 최대 12개 → 합쳐서 날짜순
CN_KEEP = re.compile(r"중국|중국어|중문|中文|화교|이중언어|통번역|통역|번역")
SKIP = ["합격자", "당첨자", "개인정보처리방침", "선정 결과", "결과 발표", "입찰", "휴관", "점검"]
TAG_ZH = [("무료", "免费"), ("모집", "招募中"), ("다문화", "多文化"), ("결혼이민", "结婚移民"), ("외국인", "外国人"), ("초등", "小学"), ("청소년", "青少年"), ("영유아", "婴幼儿"), ("돌봄", "托管"), ("방과후", "课后"),
          ("한국어", "韩语"), ("교육", "教育"), ("멘토링", "辅导"), ("진로", "升学·职业"), ("장학", "奖学金"), ("취업", "就业"), ("창업", "创业"), ("자격증", "证书"), ("체험", "体验"), ("공모전", "征集比赛"),
          ("축제", "庆典"), ("한마당", "庆典"), ("상담", "咨询"), ("법률", "法律"), ("주거", "住房"), ("임대", "租赁住房"), ("의료", "医疗"), ("통번역", "翻译")]
def mc_get(path):
    req = urllib.request.Request(MC + path, headers={"User-Agent": "Mozilla/5.0 (hanzhinan-bot; +https://hanzhinan.com)", "Accept-Language": "ko"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8", "replace")
def notice_parse(page, board):
    # 실제 구조(09-21 로그): <a class=".." href="/posts/info/14918?page=1">제목</a><span class="body3 ..">2026-09-17</span><span ..>조회수</span>
    out = []
    pat = r'<a\b[^>]*href="(/posts/(?:info|notice|family|community)/(\d+))[^"]*"[^>]*>(.*?)</a>\s*(?:<[^>]+>\s*){0,3}(20\d\d)[-.](\d{1,2})[-.](\d{1,2})'
    for m in re.finditer(pat, page, re.S):
        title = _html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", m.group(3)))).strip()
        if len(title) < 4: continue
        try: date = datetime.date(int(m.group(4)), int(m.group(5)), int(m.group(6)))
        except ValueError: continue
        out.append({"id": m.group(2), "path": m.group(1), "title": title, "date": date, "board": m.group(1).split("/")[2]})
    return out
def notice_fetch():
    items, ok = [], 0
    for board, ko, zh in BOARDS:
        for pg in (1, 2, 3):
            try:
                page = mc_get(f"/posts/{board}?page={pg}")
                got = notice_parse(page, board); ok += 1
                print(f"notice {board} p{pg}: bytes={len(page)} parsed={len(got)}")
                if not got:   # 구조가 바뀌었을 때 원인 찾기용
                    i = page.find(f'href="/posts/{board}/')
                    print("  anchors:", page.count(f'href="/posts/{board}/'), "| snippet:", page[max(0, i - 200):i + 600].replace("\n", " ") if i >= 0 else "none")
                items += got
            except Exception as e:
                print("notice failed", board, pg, e)
    if not ok or not items: return None   # 접속 실패·파싱 0건이면 기존 내용 유지 (빈 목록으로 덮지 않음)
    seen, out = set(), []
    for it in sorted(items, key=lambda x: x["date"], reverse=True):
        key = re.sub(r"\W+", "", it["title"])[:40]
        if key in seen or it["id"] in seen: continue
        if (TODAY - it["date"]).days > NOTICE_DAYS or it["date"] > TODAY: continue
        if any(s in it["title"] for s in SKIP): continue
        seen.add(key); seen.add(it["id"]); out.append(it)
    return out   # 2026-10-02: 게시판별로 나눠서 main에서 각각 NOTICE_MAX개씩
def notice_sample():
    return [{"id": "14918", "path": "/posts/info/14918", "title": "열매나눔재단 여성가장 창업지원 「2026년 With우리 열매맘 창업지원사업」", "date": TODAY - datetime.timedelta(days=4), "board": "info"},
            {"id": "14895", "path": "/posts/info/14895", "title": "[서울시립마포청소년센터] 초등 다문화 청소년을 위한 무료 방과후 돌봄 교실", "date": TODAY - datetime.timedelta(days=10), "board": "info"},
            {"id": "15014", "path": "/posts/family/15014", "title": "[중랑구] 제18회 패밀리파티 '함께 놀자'", "date": TODAY - datetime.timedelta(days=6), "board": "family"},
            {"id": "15015", "path": "/posts/community/15015", "title": "[노원구가족센터]다문화가족자조모임'늘솜BAN' 1 회기", "date": TODAY - datetime.timedelta(days=6), "board": "community"},
            {"id": "14818", "path": "/posts/notice/14818", "title": "[한국건강가정진흥원] 다누리콜센터1577-1366 지원언어 확대 안내(아랍어, 인도네시아어)", "date": TODAY - datetime.timedelta(days=38), "board": "notice"}]
def notice_render(items):
    # 2026-10-02: 목록 → 간단한 표 (내용 | 날짜 | 원문). 제목은 원문 그대로, 앞의 [기관명]은 작은 글씨로 분리
    # 2026-10-02: 표 하나로 통일 — ⭐추천 행(손으로 관리)은 표 위쪽 고정, 여기서는 자동 행(<tr>)만 만든다
    if not items: return '        <tr><td colspan="3"><span class="zh">最近半年没有新帖子。</span><span class="ko">최근 6개월 새 글이 없어요.</span></td></tr>\n'
    rows = []
    for it in items:
        t = it["title"].strip()
        m = re.match(r"^\s*\[([^\]]{1,30})\]\s*(.+)$", t)
        org, main = (m.group(1), m.group(2)) if m else ("", t)
        tags = []
        for k, z in TAG_ZH:
            if k in t and z not in tags: tags.append(z)
        new = '<span class="tag ok">新</span> ' if not it.get("cat") and 0 <= (TODAY - it["date"]).days <= 7 else ""
        cn = '<span class="tag info">中文</span> ' if CN_KEEP.search(t) else ""
        bz = BOARD_ZH.get(it["board"], "")
        if it.get("cat"):   # 서울시 행사·참여 신청: 분야 + 기간
            per = f'{it["start"].month}.{it["start"].day}–{it["end"].month}.{it["end"].day}' if it.get("end") else ""
            sub = " · ".join(x for x in [bz, CAT_ZH.get(it["cat"], esc(it["cat"])), per] if x)
        else:
            sub = " · ".join(x for x in [bz, esc(org), " · ".join(tags[:2])] if x)
        d = it["date"]
        dcell = f'~{it["end"].month}.{it["end"].day}' if it.get("end") else f'{d.month}.{d.day}'
        href = it.get("url") or MC + it["path"]
        rows.append(f'        <tr data-b="{it["board"]}"><td>{new}{cn}<span lang="ko">{esc(main)}</span>' + (f'<small class="nt-sub">{sub}</small>' if sub else "") +
                    f'</td><td class="nt-d">{dcell}</td><td class="nt-l"><a href="{href}" target="_blank" rel="noopener"><span class="zh">原文</span><span class="ko">원문</span> ↗</a></td></tr>\n')
    return "".join(rows)

# ---------------- 0-1. 서울시 문화참여 달력 (행사 및 축제 · 참여 신청) — 2026-10-28 추가, 열쇠 불필요 ----------------
# 月亮妈妈: 서울시 행사·축제와 참여 신청을 중국인 친구들에게 공유. 달력 화면(이번 달)에 「종류 제목 기간 분야」가 글로 들어 있음 (10-28 probe-2 확인)
SEOUL_CAL = "https://www.seoul.go.kr/realmnews/culture/calendar.do"
# 2026-10-28 오후: 「행사 및 축제」는 링크가 엉뚱한 글로 가서 뺌(月亮妈妈 확인) → 대신 복지 › 교육소식 + 문화 › 새소식 (seoul_news_fetch)
SEOUL_LISTS = [("apply", "https://www.seoul.go.kr/eventreqst/list.do")]
CAT_ZH = {"문화": "文化", "경제": "经济", "복지": "福利", "환경": "环境", "행정": "行政", "교통": "交通", "안전": "安全", "주택": "住房"}
EV_MAX = 12
def seoul_get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (hanzhinan-bot; +https://hanzhinan.com)", "Accept-Language": "ko"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8", "replace")
def _d10(s):
    y, m, d = (int(x) for x in s.split("-")); return datetime.date(y, m, d)
def seoul_events_fetch():
    out = []
    # ① 달력: 기간이 있어서 끝난 것을 뺄 수 있음 (이번 달 + 다음 달)
    nxt = (TODAY.replace(day=1) + datetime.timedelta(days=32)).replace(day=1)
    for url in (SEOUL_CAL, f"{SEOUL_CAL}?year={nxt.year}&month={nxt.month}"):
        try: page = seoul_get(url)
        except Exception as e: print("seoul cal failed", url, e); continue
        n = 0
        for m in re.finditer(r'<a\b[^>]*href="(https?://news\.seoul\.go\.kr/[^"]+/archives/\d+)"[^>]*>(.*?)</a>', page, re.S):
            t = _html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", m.group(2)))).strip()
            k = re.match(r"^(참여 신청|행사 및 축제)\s+(.+?)\s+(신청기간|행사기간)\s+(20\d\d-\d\d-\d\d)\s*~\s*(20\d\d-\d\d-\d\d)\s+(\S+)", t)
            if not k: continue
            title = re.sub(r"^\((모집완료|마감|종료)\)\s*", "", k.group(2)); n += 1
            if title != k.group(2): continue   # 모집완료·마감 표시된 것은 뺌
            if k.group(1) != "참여 신청": continue   # 행사 및 축제는 뺌 (10-28)
            out.append({"id": m.group(1), "url": m.group(1), "title": title, "board": "apply" if k.group(1) == "참여 신청" else "event",
                        "start": _d10(k.group(4)), "end": _d10(k.group(5)), "cat": k.group(6)})
        print(f"seoul cal {url}: matched {n}")
        time.sleep(0.5)
    # ② 목록 두 개도 늘 함께 (달력 화면엔 오늘 것만 조금 나옴 — 10-28 실제 4개뿐) · 게시일만 있음 → 최근 30일, 끝난 것·업체 대상 빼기
    if True:
        have = {x["id"] for x in out}
        for b, url in SEOUL_LISTS:
            try: page = seoul_get(url)
            except Exception as e: print("seoul list failed", url, e); continue
            for m in re.finditer(r'<a\b[^>]*href="(https?://news\.seoul\.go\.kr/[^"]+/archives/\d+)"[^>]*>(.*?)</a>', page, re.S):
                t = _html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", m.group(2)))).strip().lstrip("-> ").strip()
                k = re.match(r"^(.+?)\s+(20\d\d-\d\d-\d\d) \d\d:\d\d:\d\d\s+\[(\S+?)\]", t)
                if not k: continue
                d = _d10(k.group(2))
                if (TODAY - d).days > 30 or m.group(1) in have: continue
                if re.search(r"모집완료|마감|종료|결과|당첨|가맹점|사업자", k.group(1)): continue   # 끝난 것·업체 대상은 뺌
                # 제목에 날짜가 있고 그날이 지났으면 뺌 (예: 「2026.9.26(토) 행사」, 「[10.24.(토)~10.25.(일)]」)
                ds = re.findall(r"(?:(20\d\d)[.\-]\s?)?(\d{1,2})[.월]\s?(\d{1,2})[.일]?", k.group(1))
                if ds:
                    y, mo, dd = ds[-1]
                    try:
                        last = datetime.date(int(y) if y else d.year, int(mo), int(dd))
                        if last < TODAY: continue
                    except ValueError: pass
                have.add(m.group(1))
                out.append({"id": m.group(1), "url": m.group(1), "title": k.group(1), "board": b, "start": d, "end": None, "cat": k.group(3)})
            print(f"seoul list {b}: {len([x for x in out if x['board'] == b])}")
    seen, keep = set(), []
    for it in out:
        if it["id"] in seen: continue
        if it["end"] and it["end"] < TODAY: continue
        seen.add(it["id"]); it["date"] = it["start"]; keep.append(it)
    ap = sorted([x for x in keep if x["board"] == "apply"], key=lambda x: x["end"] or x["start"])[:EV_MAX]
    print("seoul apply", len(ap))
    return ap

# ---------------- 0-2. 서울시 분야별 소식: 복지 › 교육소식 + 문화 › 새소식 — 2026-10-28 추가 (행사·축제 대신) ----------------
# 주소는 10-28 확인. 글 주소 = news.seoul.go.kr/<분야>/archives/번호 (교육소식은 끝에 ?listPage=1). 날짜 = 제목 뒤 「등록일 : 2026-10-27」 또는 「2026-10-21 16:06:27」
# 교육소식: 글이 드묾(2026-03 다음 10-27) → 날짜 제한 없이 최근 6개 / 문화: 거의 매일 → 최근 30일, 끝난 행사·업체 대상 빼고 최대 10개
SEOUL_NEWS = [  # (분류, 목록 주소, 분야, 최근 며칠(None=제한 없음), 최대 개수)
    ("edu", "https://news.seoul.go.kr/welfare/archives/category/education-news_c1/eudcation-business_c1/education-news-n1", "welfare", None, 6),
    ("culture", "https://news.seoul.go.kr/culture/news-all", "culture", 30, 10),
]
NEWS_DROP = re.compile(r"모집완료|마감|종료|결과|당첨|가맹점|사업자|공모 공고|입찰|채용")
def title_past(t, base):
    # 제목 속 날짜가 오늘보다 앞이면 True — 「(2026.10.31.토)」 「(26.10.17.)」 「10.29.(목)」 「[10.24.(토)~10.25.(일)]」
    found = []
    for m in re.finditer(r"(?<!\d)(?:(20\d\d|\d\d)[.\-]\s?)?(\d{1,2})[.월]\s?(\d{1,2})(?:[.일)]|(?!\d))", t):
        y, mo, dd = m.groups()
        y = int(y) if y and len(y) == 4 else (2000 + int(y) if y else base.year)
        try: found.append(datetime.date(y, int(mo), int(dd)))
        except ValueError: pass
    return bool(found) and max(found) < TODAY
def seoul_list_parse(page, sec):
    # news.seoul.go.kr 목록 화면 → [{url, title, date}] (같은 글 링크 여러 개 → 제목 있는 첫 링크, 날짜는 다음 글 링크 전까지에서 찾음)
    hits = [(m.start(), m.group(1), re.sub(r"\s+", " ", _html.unescape(re.sub(r"<[^>]+>", " ", m.group(3)))).replace("AI 요약", "").strip())
            for m in re.finditer(r'<a\b[^>]*href="(https?://news\.seoul\.go\.kr/' + sec + r'/archives/(\d+))/?(?:\?[^"]*)?"[^>]*>(.*?)</a>', page, re.S)]
    seen, got = set(), []
    for i, (a, href, t) in enumerate(hits):
        if href in seen or len(t) < 6: continue
        nxt = next((b for b, h2, _ in hits[i + 1:] if h2 != href), len(page))
        d = re.search(r"(20\d\d)-(\d\d)-(\d\d)", re.sub(r"<[^>]+>", " ", page[a:nxt]))
        if not d: continue
        seen.add(href)
        got.append({"id": href, "url": href, "title": t, "date": datetime.date(int(d.group(1)), int(d.group(2)), int(d.group(3)))})
    return got
def seoul_news_fetch():
    out = []
    for board, url, sec, days, mx in SEOUL_NEWS:
        try: page = seoul_get(url)
        except Exception as e: print("seoul news failed", board, e); continue
        got = []
        for it in seoul_list_parse(page, sec):
            if days and (TODAY - it["date"]).days > days: continue
            if board != "edu" and (NEWS_DROP.search(it["title"]) or title_past(it["title"], it["date"])): continue
            it["board"] = board; got.append(it)
        got.sort(key=lambda x: x["date"], reverse=True)
        print(f"seoul news {board}: {len(got)}")
        for x in got[:mx]: print("  ", board, x["date"], x["title"][:50])
        out += got[:mx]
    return out
def seoul_news_sample():
    return [{"id": "e1", "url": "https://news.seoul.go.kr/welfare/archives/577980", "title": "산후조리경비·임산부 교통비 둘째부터 더 받는다…서울시, 다자녀가구 전폭 지원", "board": "edu", "date": datetime.date(2026, 3, 18)},
            {"id": "c1", "url": "https://news.seoul.go.kr/culture/archives/535069", "title": "서울생활사박물관, 문화가 흐르는 박물관 가을음악회 개최(2026.10.31.토)", "board": "culture", "date": TODAY - datetime.timedelta(days=7)}]
def seoul_events_sample():
    return [{"id": "s3", "url": "https://news.seoul.go.kr/gov/archives/581152", "title": "제12회 서울 29초 영화제 공모 안내", "board": "apply", "start": TODAY - datetime.timedelta(days=27), "end": TODAY + datetime.timedelta(days=13), "cat": "행정", "date": TODAY - datetime.timedelta(days=27)}]

# ---------------- 1. 복지서비스 (补助) ----------------
WELFARE_URL = "https://apis.data.go.kr/B554287/NationalWelfareInformationsV001/NationalWelfarelistV001"
THEME_ZH = {"010": "身体健康", "020": "心理健康", "030": "生活支援", "040": "住房", "050": "工作", "060": "文化·休闲", "070": "安全·危机", "080": "怀孕·生育", "090": "托育", "100": "教育", "110": "收养·寄养", "120": "保护·照护", "130": "平民金融", "140": "法律"}
LIFE_ZH = {"001": "婴幼儿", "002": "儿童", "003": "青少年", "004": "青年", "005": "中壮年", "006": "老年", "007": "怀孕·生育"}
TARGET_ZH = {"010": "多文化·脱北民", "020": "多子女", "030": "报勋对象", "040": "残疾人", "050": "低收入", "060": "单亲·祖孙"}
QUERIES = [  # 우리 독자 = 한국에서 아이 키우는 중국인 엄마 (2026-10-02 개편: 주거 전체 → 임신·영유아로 교체)
    {"trgterIndvdlArray": "010"},                     # 다문화
    {"trgterIndvdlArray": "020"},                     # 다자녀
    {"intrsThemaArray": "080"},                       # 임신·출산
    {"lifeArray": "001"},                             # 영유아
    {"intrsThemaArray": "090"},                       # 보육
    {"intrsThemaArray": "100", "lifeArray": "002"},   # 교육 × 아동
]
# 아이 키우는 가정과 관계없는 것 거르기. 단, 제목에 「다문화」가 있으면 남김 (예: 다문화·탈북학생 멘토링)
EXCLUDE = ["북한이탈", "탈북", "영농", "개발제한", "보육교직원", "특수학", "장애학생", "지방세", "고효율가전", "노후공공임대", "성폭력"]
def welfare_keep(it):
    t = it.get("servNm", "")
    return "다문화" in t or not any(k in t for k in EXCLUDE)
def welfare_fetch():
    seen, out = set(), []
    for q in QUERIES:
        p = {"serviceKey": KEY, "callTp": "L", "pageNo": 1, "numOfRows": 50, "srchKeyCode": "003", "searchWrd": ""}
        p.update(q)
        try: items = xml_items(get(WELFARE_URL, p))
        except Exception as e: print("welfare query failed", q, e); continue
        for it in items:
            sid = it.get("servId")
            if not sid or sid in seen or not welfare_keep(it): continue
            seen.add(sid); out.append(it)
    out.sort(key=lambda x: first(x, "lastModYmd", "inqNum"), reverse=True)
    return out[:24]
def welfare_sample():
    return [{"servId": "WLF00000001", "servNm": "다문화가족 자녀 교육활동비 지원", "servDgst": "기준중위소득 100% 이하 다문화가족의 7~18세 자녀에게 교육활동비 지원", "servDtlLink": "https://www.bokjiro.go.kr/", "lifeArray": "아동,청소년", "trgterIndvdlArray": "다문화·탈북민", "intrsThemaArray": "교육", "sprtCycNm": "년", "srvPvsnNm": "현금지급", "aplyMtdNm": "방문", "jurMnofNm": "여성가족부", "jurOrgNm": "다문화가족과", "lastModYmd": "20260910"},
            {"servId": "WLF00000002", "servNm": "신혼부부 전세자금 대출", "servDgst": "혼인 7년 이내 무주택 신혼부부에게 전세자금 저리 대출", "servDtlLink": "https://www.bokjiro.go.kr/", "lifeArray": "청년,중장년", "trgterIndvdlArray": "", "intrsThemaArray": "주거", "sprtCycNm": "1회성", "srvPvsnNm": "기타", "aplyMtdNm": "온라인,방문", "jurMnofNm": "국토교통부", "jurOrgNm": "주택기금과", "lastModYmd": "20260901"}]
def welfare_render(items):
    zh_path = os.path.join(HERE, "welfare_zh.json")
    zh = json.load(open(zh_path, encoding="utf-8")) if os.path.exists(zh_path) else {}
    if not items: return '    <p class="note"><span class="zh">暂时没有符合条件的新服务。每周一自动更新。</span><span class="ko">지금은 조건에 맞는 새 서비스가 없어요. 매주 월요일 자동 갱신.</span></p>\n'
    cards = []
    for it in items:
        sid = it.get("servId", ""); z = zh.get(sid, {})
        ko_title = esc(it.get("servNm"))
        title = (f'<span class="zh">{z["title"]}</span><span class="ko">{ko_title}</span>' if z.get("title") else ko_title)
        ko_dg = esc(it.get("servDgst"))
        dg = (f'<span class="zh">{z["summary"]}</span><span class="ko">{ko_dg}</span>' if z.get("summary") else ko_dg)
        tags = " · ".join(t for t in [esc(codes_to_zh(it.get("trgterIndvdlArray"), TARGET_ZH)), esc(codes_to_zh(it.get("lifeArray"), LIFE_ZH)), esc(codes_to_zh(it.get("intrsThemaArray"), THEME_ZH))] if t)
        d = it.get("lastModYmd", ""); ds = f"{d[:4]}.{int(d[4:6])}.{int(d[6:8])}" if len(d) == 8 else ""
        new = ""
        try:
            if d and (TODAY - datetime.date(int(d[:4]), int(d[4:6]), int(d[6:8]))).days <= 14: new = '<span class="tag ok">新</span> '
        except Exception: pass
        link = first(it, "servDtlLink", "servDtlUrl") or f"https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId={sid}"
        cards.append(f'''    <article class="ntc ev" data-s="{esc(s)}" data-e="{esc(e)}" data-area="{it.get("_area", "")}">
      <div class="ntc-top">{new}<span class="tag info">{tags or "福利服务"}</span></div>
      <h3>{title}</h3>
      <p class="ntc-sum">{dg}</p>
      <dl class="kv">
        <dt><span class="zh">怎么申请</span><span class="ko">신청 방법</span></dt><dd>{esc(it.get("aplyMtdNm")) or "见原文"} · {esc(it.get("srvPvsnNm"))}{(" · " + esc(it.get("sprtCycNm"))) if it.get("sprtCycNm") else ""}</dd>
        <dt><span class="zh">主管</span><span class="ko">담당</span></dt><dd>{esc(it.get("jurMnofNm"))}{(" " + esc(it.get("jurOrgNm"))) if it.get("jurOrgNm") else ""}</dd>
        <dt><span class="zh">更新</span><span class="ko">갱신</span></dt><dd>{ds} · <a href="{esc(link)}" target="_blank" rel="noopener"><span class="zh">복지로 原文</span><span class="ko">복지로에서 보기</span></a></dd>
      </dl>
    </article>
''')
    return "".join(cards)

# ---------------- 2. 관광행사 中文 (本月活动) ----------------
TOUR_BASES = ["https://apis.data.go.kr/B551011/ChsService2/searchFestival2", "https://apis.data.go.kr/B551011/ChsService1/searchFestival1"]
AREA_ZH = {"1": "首尔", "2": "仁川", "31": "京畿", "39": "济州", "6": "釜山"}
def tour_fetch():
    # 09-21 로그: ChsService2는 오류 없이 0건, ChsService1은 400(폐지) → 2만 사용.
    # 지역·종료일 조건을 서버에 주지 않고 넓게 받아서 여기서 거른다 (조건 이름이 버전마다 달라 0건이 나오는 것을 피함).
    start = TODAY.replace(day=1); end = (start + datetime.timedelta(days=62)).replace(day=1) - datetime.timedelta(days=1)
    s8, e8 = start.strftime("%Y%m%d"), end.strftime("%Y%m%d")
    out = []
    for pg in (1, 2, 3):
        p = {"serviceKey": KEY, "MobileOS": "ETC", "MobileApp": "hanzhinan", "_type": "json", "numOfRows": 100, "pageNo": pg, "arrange": "A", "eventStartDate": s8}
        try:
            j = json.loads(get(TOUR_BASES[0], p))
            body = j["response"]["body"]; items = body.get("items") or {}
            rows = items.get("item", []) if isinstance(items, dict) else []
            print(f"tour p{pg}: header={j['response'].get('header')} total={body.get('totalCount')} rows={len(rows)}")
            if pg == 1 and rows: print("  tour keys:", sorted(rows[0].keys()))
        except Exception as e:
            print("tour failed", pg, e); break
        if not rows: break
        for it in rows:
            area = str(first(it, "areacode", "areaCode", "lDongRegnCd"))
            zh = {"1": "首尔", "2": "仁川", "31": "京畿", "11": "首尔", "28": "仁川", "41": "京畿"}.get(area)   # 구 지역코드 / 신 법정동 시도코드 — 首尔·仁川·京畿만
            if not zh: continue
            s, e = it.get("eventstartdate", ""), it.get("eventenddate", "")
            if s and s > e8: continue
            if e and e < TODAY.strftime("%Y%m%d"): continue
            it["_area"] = zh; out.append(it)
        if len(rows) < 100: break
    out.sort(key=lambda x: x.get("eventstartdate", ""))
    print("tour kept", len(out))
    return out[:30]
def tour_sample():
    return [{"title": "首尔灯节", "addr1": "首尔特别市中区清溪川路", "eventstartdate": "20261001", "eventenddate": "20261031", "tel": "02-120", "_area": "首尔", "firstimage": ""},
            {"title": "京畿世界陶瓷双年展", "addr1": "京畿道利川市", "eventstartdate": "20260918", "eventenddate": "20261101", "tel": "031-631-6501", "_area": "京畿", "firstimage": ""}]
TOUR_DETAIL = "https://apis.data.go.kr/B551011/ChsService2/detailCommon2"
def tour_homepage(cid):
    # 행사 공식 홈페이지 (관광공사 상세정보 homepage 필드: '<a href="...">' 형태)
    if not cid or not KEY: return ""
    try:
        j = json.loads(get(TOUR_DETAIL, {"serviceKey": KEY, "MobileOS": "ETC", "MobileApp": "hanzhinan", "_type": "json", "contentId": cid}))
        items = j["response"]["body"].get("items") or {}
        row = (items.get("item") or [{}])[0] if isinstance(items, dict) else {}
        hp = str(row.get("homepage") or "")
        m = re.search(r'href=["\']?([^"\' >]+)', hp) or re.search(r"(https?://[^\s<\"']+)", hp)
        return _html.unescape(m.group(1)) if m else ""
    except Exception as e:
        print("tour detail failed", cid, e); return ""
def tour_ko(title):
    m = re.search(r"[（(]([^（()）]*[가-힣][^（()）]*)[)）]\s*$", title or "")
    return (m.group(1) if m else title or "").strip()
def tour_render(items):
    if not items: return '        <tr><td colspan="3">这两个月首尔·仁川·京畿没有登记的活动。每周一自动更新。</td></tr>\n'
    def md(s): return f"{int(s[4:6])}.{int(s[6:8])}" if len(s) == 8 else "—"
    rows = []
    for it in items:
        s, e = it.get("eventstartdate", ""), it.get("eventenddate", "")
        t = it.get("title", ""); ko = tour_ko(t); zh = re.sub(r"\s*[（(][^（()）]*[가-힣][^（()）]*[)）]\s*$", "", t).strip() or t
        hp = it.get("_homepage") or tour_homepage(first(it, "contentid", "contentId"))
        if hp:
            link = f'<a href="{esc(hp)}" target="_blank" rel="noopener">官网 ↗</a>'
        else:
            link = f'<a href="https://search.naver.com/search.naver?query={urllib.parse.quote(ko)}" target="_blank" rel="noopener">查询 ↗</a>'
        sub = f'<small class="nt-sub" lang="ko">{esc(ko)}</small>' if ko and ko != zh else ""
        rows.append(f'        <tr class="evr" data-area="{it.get("_area", "")}" data-s="{esc(s)}" data-e="{esc(e)}"><td>{esc(zh)}{sub}</td><td class="nt-d">{md(s)}～{md(e)}</td><td class="nt-l">{link}</td></tr>\n')
    return "".join(rows)

# ---------------- 2-1. 한강공원 행사 (本月活动 › 汉江公园) — 2026-10-26 추가, 열쇠 불필요 ----------------
# 출처: 미래한강본부 행사·공연 정보 (진행중 Y + 진행예정 B). 목록은 서버가 HTML로 바로 줌 (pageNo로 넘김)
HG_LIST = "https://hangang.seoul.go.kr/www/eventMng/list.do"
HG_DETAIL = "https://hangang.seoul.go.kr/www/eventMng/detail.do?mid=538&evntSn="
HG_PARK = [("광나루", "广渡口"), ("잠실", "蚕室"), ("뚝섬", "纛岛"), ("잠원", "蚕院"), ("반포", "盘浦"), ("이촌", "二村"), ("여의도", "汝矣岛"),
           ("양화", "杨花"), ("난지", "兰芝"), ("망원", "望远"), ("강서", "江西"), ("서울숲", "首尔林"), ("광진교", "广津桥"), ("잠수교", "潜水桥"), ("밤섬", "栗岛")]
HG_CATE = {"축제": "节庆", "체육": "体育", "문화예술": "文艺", "수상": "水上"}
def hg_get(page):
    q = urllib.parse.urlencode({"mid": 538, "opt14": "Y,B", "pageNo": page})
    req = urllib.request.Request(HG_LIST + "?" + q, headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36", "Accept-Language": "ko-KR,ko;q=0.9"})
    last = None
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=25) as r: return r.read().decode("utf-8", "replace")
        except Exception as e:
            last = e; print(f"  hangang retry {attempt + 1}/3:", e); time.sleep(3 * (attempt + 1))
    raise last
def hg_text(t): return _html.unescape(re.sub(r"<[^>]+>", "", t or "")).strip()
def hangang_fetch():
    """None = 접속 실패·구조 변경(기존 유지) / [] = 정말 0건"""
    out, total = [], None
    for pg in range(1, 6):
        try: page = hg_get(pg)
        except Exception as e: print("hangang failed", pg, e); return None
        m = re.search(r"총\s*<?[^0-9]*?([0-9,]+)\s*</?[^>]*>?\s*개", page) or re.search(r"총\s*([0-9,]+)\s*개", hg_text(page))
        if pg == 1: total = int(m.group(1).replace(",", "")) if m else None; print("hangang total:", total)
        blocks = re.findall(r'<li class="list-item">(.*?)<div class="event-btns">', page, flags=re.S)
        for b in blocks:
            sn = re.search(r"goDetail\('(\d+)'\)", b); tit = re.search(r'class="event-tit"[^>]*>(.*?)</a>', b, flags=re.S)
            if not sn or not tit: continue
            dd = {hg_text(k): hg_text(v) for k, v in re.findall(r"<dt>(.*?)</dt>\s*<dd>(.*?)</dd>", b, flags=re.S)}
            ds = re.findall(r"(\d{4})-(\d{2})-(\d{2})", dd.get("기간", ""))
            if not ds: continue
            cate = re.search(r'class="cate[^"]*">(.*?)<', b)
            out.append({"sn": sn.group(1), "title": hg_text(tit.group(1)), "s": "".join(ds[0]), "e": "".join(ds[-1]),
                        "cate": hg_text(cate.group(1)) if cate else "", "join": dd.get("참여", ""), "place": dd.get("장소", "")})
        if len(blocks) < 6 or (total is not None and len(out) >= total): break   # 한 쪽에 6건 · 총 개수 다 받으면 멈춤
    seen = set(); out = [x for x in out if not (x["sn"] in seen or seen.add(x["sn"]))]   # 같은 행사 중복 제거
    print("hangang kept", len(out))
    if total is None and not out: print("  hangang: 목록 구조를 못 읽음 → 기존 유지"); return None
    if total and not out: print("  hangang: 총", total, "개인데 0건 파싱 → 구조 변경 의심, 기존 유지"); return None
    return out
def hangang_sample():
    return [{"sn": "445", "title": "2026 한강불빛 공연 드론라이트쇼 (하반기)", "s": "20260912", "e": "20261031", "cate": "축제", "join": "현장참여", "place": "뚝섬한강공원"}]
def hangang_zh(title):
    # 제목 번역은 hangang_zh.json (한국어 → 中文, 연도 뺀 제목 기준). 없으면 한국어 그대로 + 로그에 「번역 필요」
    try: table = json.load(open(os.path.join(HERE, "hangang_zh.json"), encoding="utf-8"))
    except Exception: table = {}
    y = re.match(r"(20\d\d)\s+", title); core = title[y.end():] if y else title
    zh = table.get(core.strip())
    if not zh: print("  hangang 번역 필요:", core); return ""
    return (y.group(1) + " " if y else "") + zh
def hangang_render(items):
    def md(s): return f"{int(s[4:6])}.{int(s[6:8])}"
    rows = []
    for it in sorted(items, key=lambda x: (x["e"], x["s"])):
        ko = it["title"]; zh = hangang_zh(ko)
        park = next((z for k, z in HG_PARK if k in it["place"]), "")
        bits = [("📍" + park) if park else "", HG_CATE.get(it["cate"], ""), "需预约" if re.search(r"예약|접수", it["join"]) else "现场参加"]
        meta = " · ".join(x for x in bits if x)
        name = f'{esc(zh)}<small class="nt-sub" lang="ko">{esc(ko)}</small>' if zh else f'<span lang="ko">{esc(ko)}</span>'
        rows.append(f'        <tr class="evr" data-area="汉江" data-s="{it["s"]}" data-e="{it["e"]}"><td>{name}<small class="nt-sub">{esc(meta)}</small></td>'
                    f'<td class="nt-d">{md(it["s"])}～{md(it["e"])}</td><td class="nt-l"><a href="{esc(HG_DETAIL)}{it["sn"]}" target="_blank" rel="noopener">详情 ↗</a></td></tr>\n')
    return "".join(rows)

# ---------------- 3. 아파트 실거래 (房价) ----------------
APT_URLS = ["https://apis.data.go.kr/1613000/RTMSDataSvcAptTradeDev/getRTMSDataSvcAptTradeDev",   # 상세 자료 (승인된 쪽)
            "https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade"]         # 기본 자료 (폴백)
GU = [("11110", "钟路区", "종로구"), ("11140", "中区", "중구"), ("11170", "龙山区", "용산구"), ("11200", "城东区", "성동구"), ("11215", "广津区", "광진구"), ("11230", "东大门区", "동대문구"), ("11260", "中浪区", "중랑구"), ("11290", "城北区", "성북구"), ("11305", "江北区", "강북구"), ("11320", "道峰区", "도봉구"), ("11350", "芦原区", "노원구"), ("11380", "恩平区", "은평구"), ("11410", "西大门区", "서대문구"), ("11440", "麻浦区", "마포구"), ("11470", "阳川区", "양천구"), ("11500", "江西区", "강서구"), ("11530", "九老区", "구로구"), ("11545", "衿川区", "금천구"), ("11560", "永登浦区", "영등포구"), ("11590", "铜雀区", "동작구"), ("11620", "冠岳区", "관악구"), ("11650", "瑞草区", "서초구"), ("11680", "江南区", "강남구"), ("11710", "松坡区", "송파구"), ("11740", "江东区", "강동구")]
def apt_month():
    m = TODAY.replace(day=1) - datetime.timedelta(days=1)   # 지난달
    m = m.replace(day=1) - datetime.timedelta(days=1)       # 지지난달 (신고 30일 지연)
    return m.strftime("%Y%m")
def apt_pick_url(ym):
    for u in APT_URLS:   # 강남구로 한 번 찔러 보고 되는 쪽 사용
        try:
            xml_items(get(u, {"serviceKey": KEY, "LAWD_CD": "11680", "DEAL_YMD": ym, "pageNo": 1, "numOfRows": 1}))
            print("apt endpoint:", u.split("/")[-2]); return u
        except Exception as e:
            print("apt endpoint failed", u.split("/")[-2], e)
    return None
def apt_fetch():
    ym = apt_month(); rows = []
    url = apt_pick_url(ym)
    if not url: return ym, rows
    fails = 0
    for code, zh, ko in GU:
        try:
            items = xml_items(get(url, {"serviceKey": KEY, "LAWD_CD": code, "DEAL_YMD": ym, "pageNo": 1, "numOfRows": 1000}))
        except Exception as e:
            print("apt failed", ko, e); items = []; fails += 1
            if fails >= 3: print("apt: 연속 실패 → 중단"); break
        prices, ppy = [], []
        for it in items:
            try:
                amt = int(first(it, "dealAmount", "거래금액").replace(",", "").strip() or 0); ar = float(first(it, "excluUseAr", "전용면적") or 0)
                if first(it, "cdealType", "해제여부").strip() == "O": continue   # 계약 해제 건 제외
                if amt <= 0 or ar <= 0: continue
                prices.append(amt); ppy.append(amt / (ar / 3.3058))
            except Exception: continue
        rows.append({"zh": zh, "ko": ko, "n": len(prices), "med": statistics.median(prices) if prices else 0, "ppy": statistics.median(ppy) if ppy else 0})
    return ym, rows
def apt_sample():
    return "202607", [{"zh": "江南区", "ko": "강남구", "n": 210, "med": 245000, "ppy": 9800}, {"zh": "永登浦区", "ko": "영등포구", "n": 150, "med": 128000, "ppy": 5200}, {"zh": "芦原区", "ko": "노원구", "n": 300, "med": 68000, "ppy": 3100}]
def apt_render(ym, rows):
    rows = [r for r in rows if r["n"]]
    if not rows: return '    <p class="note">本月数据还没公布（实交易申报有 30 天延迟）。下次自动更新再看。</p>\n'
    rows.sort(key=lambda r: -r["med"])
    def eok(x): return f"{x/10000:.1f} 亿"
    trs = "".join(f'<tr><td style="white-space:nowrap"><strong>{r["zh"]}</strong><br><span style="color:var(--ink-2);font-size:.85rem">{r["ko"]}</span></td><td>{eok(r["med"])}</td><td>{r["ppy"]/10000:.2f} 亿</td><td>{r["n"]}</td></tr>' for r in rows)
    return f'''    <p class="note">{ym[:4]} 年 {int(ym[4:])} 月 首尔 25 区公寓<strong>实际成交</strong>：中位数成交价、每坪（3.3㎡）中位单价、成交套数。单位：韩元。</p>
    <div class="tbl">
    <table>
      <thead><tr><th>区</th><th>成交价中位数</th><th>每坪中位</th><th>套数</th></tr></thead>
      <tbody>{trs}</tbody>
    </table>
    </div>
'''


# ---------------- 3-1. 서울 아파트 매매 동향 + 최근 실거래 + 주택 소식 (房价 위쪽) — 2026-10-29 ----------------
# 月亮妈妈: 서울부동산정보광장(land.seoul.go.kr)처럼 「동향 카드 + 실거래 표 + 새소식」. 매매만 (전월세는 나중에)
# 이번 달 + 지난달 자료에서 최근 30일 안에 계약된 것 → 최고가·최저가·중위·건수, 최근 계약 10건
HOUSE_NEWS = "https://news.seoul.go.kr/citybuild/archives/category/build-news_c1/build_news-news-n1"   # 주택 › 주택건축 › 주택건축소식 (10-29 확인)
HOUSE_DROP = re.compile(r"서류|인증공고|위원|심의|설계|건축사|입찰|결과 공고|채용")
def apt_recent_fetch():
    yms = [TODAY.strftime("%Y%m"), (TODAY.replace(day=1) - datetime.timedelta(days=1)).strftime("%Y%m")]
    url = apt_pick_url(yms[1])
    if not url: return None
    deals, fails = [], 0
    for code, zh, ko in GU:
        for ym in yms:
            try: items = xml_items(get(url, {"serviceKey": KEY, "LAWD_CD": code, "DEAL_YMD": ym, "pageNo": 1, "numOfRows": 1000}))
            except Exception as e:
                print("apt recent failed", ko, ym, e); fails += 1
                if fails >= 4: print("apt recent: 연속 실패 → 중단"); return None
                continue
            for it in items:
                try:
                    if first(it, "cdealType", "해제여부").strip() == "O": continue
                    amt = int(first(it, "dealAmount", "거래금액").replace(",", "").strip() or 0); ar = float(first(it, "excluUseAr", "전용면적") or 0)
                    d = datetime.date(int(first(it, "dealYear", "년")), int(first(it, "dealMonth", "월")), int(first(it, "dealDay", "일")))
                    if amt <= 0 or ar <= 0 or (TODAY - d).days > 30: continue
                    deals.append({"d": d, "zh": zh, "ko": ko, "dong": first(it, "umdNm", "법정동").strip(), "apt": first(it, "aptNm", "아파트").strip(), "ar": ar, "amt": amt})
                except Exception: continue
        time.sleep(0.2)
    print("apt recent deals:", len(deals))
    return deals
def apt_recent_sample():
    return [{"d": TODAY - datetime.timedelta(days=2), "zh": "江南区", "ko": "강남구", "dong": "압구정동", "apt": "현대7차", "ar": 152.39, "amt": 690000},
            {"d": TODAY - datetime.timedelta(days=1), "zh": "江北区", "ko": "강북구", "dong": "수유동", "apt": "수유프리미어", "ar": 19.0, "amt": 11000},
            {"d": TODAY - datetime.timedelta(days=1), "zh": "芦原区", "ko": "노원구", "dong": "상계동", "apt": "포레나노원", "ar": 59.99, "amt": 102800},
            {"d": TODAY - datetime.timedelta(days=2), "zh": "道峰区", "ko": "도봉구", "dong": "쌍문동", "apt": "현대1", "ar": 70.3, "amt": 53000}]
def won(x):   # 만원 단위 → 「10.3 亿」「8,500 万」
    return f"{x/10000:.1f} 亿" if x >= 10000 else f"{x:,} 万"
def apt_recent_render(deals):
    if not deals: return '    <p class="note">最近 30 天还没有新的成交。</p>\n'
    hi = max(deals, key=lambda x: x["amt"]); lo = min(deals, key=lambda x: x["amt"])
    med = statistics.median([x["amt"] for x in deals])
    def who(x): return f'{esc(x["apt"])}<br>{x["zh"]} {esc(x["dong"])} · {x["ar"]:.0f}㎡ · {x["d"].month}.{x["d"].day}'
    cards = (f'      <div class="hq-c"><b>最高价</b><strong>{won(hi["amt"])}</strong><small lang="ko">{who(hi)}</small></div>\n'
             f'      <div class="hq-c"><b>最低价</b><strong>{won(lo["amt"])}</strong><small lang="ko">{who(lo)}</small></div>\n'
             f'      <div class="hq-c"><b>中位数</b><strong>{won(int(med))}</strong><small>一半比它贵，一半比它便宜</small></div>\n'
             f'      <div class="hq-c"><b>成交</b><strong>{len(deals):,} 套</strong><small>首尔 25 区合计</small></div>\n')
    recent = sorted(deals, key=lambda x: (x["d"], x["amt"]), reverse=True)[:10]
    trs = "".join(f'        <tr><td class="nt-d">{x["d"].month}.{x["d"].day}</td><td><span lang="ko">{esc(x["apt"])}</span><small class="nt-sub">{x["zh"]} · <span lang="ko">{esc(x["dong"])}</span></small></td><td class="nt-d">{x["ar"]:.0f}㎡</td><td class="nt-d"><strong>{won(x["amt"])}</strong></td></tr>\n' for x in recent)
    t0 = TODAY - datetime.timedelta(days=30)
    return (f'    <p class="hq-p">首尔公寓买卖 · 最近 30 天签约（{t0.month}.{t0.day}～{TODAY.month}.{TODAY.day}）</p>\n'
            f'    <div class="hq">\n{cards}    </div>\n'
            f'    <h3>最新成交</h3>\n    <div class="tbl ntbl">\n    <table>\n      <thead><tr><th>签约</th><th>小区</th><th>面积</th><th>成交价</th></tr></thead>\n      <tbody>\n{trs}      </tbody>\n    </table>\n    </div>\n'
            f'    <p class="law">资料：국토교통부 실거래가（公共数据门户）· 刚签约的还在陆续申报</p>\n')
def house_news_fetch():
    try: page = seoul_get(HOUSE_NEWS)
    except Exception as e: print("house news failed", e); return None
    got = [x for x in seoul_list_parse(page, "citybuild") if not HOUSE_DROP.search(x["title"])]
    got.sort(key=lambda x: x["date"], reverse=True)
    print("house news:", len(got))
    for x in got[:6]: print("  ", x["date"], x["title"][:50])
    return got[:6]
def house_news_sample():
    return [{"url": "https://news.seoul.go.kr/citybuild/archives/531782", "title": "낡은 집, '희망의 집수리'로 안전하고 편리하게 고쳐요...서울시, 2.9.(월)부터 모집", "date": datetime.date(2026, 2, 10)},
            {"url": "https://news.seoul.go.kr/citybuild/archives/530830", "title": "전세사기 피해주택 임대인 없어도 수리한다... 서울시, 보수공사비 지원", "date": datetime.date(2026, 1, 23)}]
def house_news_render(items):
    if not items: return '        <tr><td colspan="3">暂时没有新消息。</td></tr>\n'
    return "".join(f'        <tr><td><span lang="ko">{esc(x["title"])}</span></td><td class="nt-d">{x["date"].year % 100}.{x["date"].month}.{x["date"].day}</td><td class="nt-l"><a href="{x["url"]}" target="_blank" rel="noopener">原文 ↗</a></td></tr>\n' for x in items)


# ---------------- 5. 국가자격 시험일정 (妈妈自己 › 考证) — 2026-10-06 ----------------
# 한국산업인력공단 「국가자격 시험일정 조회 서비스」(data.go.kr 15074408). 같은 APPLYHOME_KEY(공공데이터포털 계정) 사용
EXAM_URL = "https://apis.data.go.kr/B490007/qualExamSchd/getQualExamSchdList"
EXAMS = [("EXAM_TOUR", "S", "9629", "관광통역안내사", "面试"), ("EXAM_MED", "T", "9105", "국제의료관광코디네이터", "实技")]
def exam_fetch(qualgb, jm):
    out = []
    for yy in (TODAY.year, TODAY.year + 1):
        p = {"serviceKey": KEY, "numOfRows": 20, "pageNo": 1, "dataFormat": "json", "implYy": yy, "qualgbCd": qualgb, "jmCd": jm}
        try:
            j = json.loads(get(EXAM_URL, p))
            body = j.get("body") or j.get("response", {}).get("body", {})
            items = body.get("items") or []
            if isinstance(items, dict): items = items.get("item", [])
            if isinstance(items, dict): items = [items]
            print(f"exam {jm} {yy}: header={j.get('header') or j.get('response', {}).get('header')} rows={len(items)}")
            out += items
        except Exception as e:
            print("exam failed", jm, yy, e)
    return out
def _d(s):
    s = str(s or "")
    try: return datetime.date(int(s[:4]), int(s[4:6]), int(s[6:8]))
    except Exception: return None
def _md(a, b=None):
    a, b = _d(a), _d(b)
    if not a: return ""
    t = f"{a.month}.{a.day}"
    if b and b != a: t += f"～{b.month}.{b.day}" if b.month != a.month else f"～{b.day}"
    return t
def exam_sample():
    return [{"implYy": str(TODAY.year), "implSeq": "1", "description": "국가전문자격 관광통역안내사", "docRegStartDt": f"{TODAY.year}0706", "docRegEndDt": f"{TODAY.year}0710", "docExamStartDt": f"{TODAY.year}0905", "docExamEndDt": f"{TODAY.year}0905", "docPassDt": f"{TODAY.year}1021", "pracRegStartDt": f"{TODAY.year}0706", "pracRegEndDt": f"{TODAY.year}0710", "pracExamStartDt": f"{TODAY.year}1114", "pracExamEndDt": f"{TODAY.year}1115", "pracPassDt": f"{TODAY.year}1216"}]
def exam_render(items, prac_zh):
    # 2026-10-21: 전문자격(관광통역안내사)은 1차 필기·2차 면접이 「같은 회차 2줄」로 오고 둘 다 doc* 칸에 날짜가 들어옴
    #   → 회차별로 묶어서 시험일 순으로 1줄째 = 笔试, 2줄째 = 面试/实技 로 표시
    groups = {}
    for it in items:
        groups.setdefault((str(it.get("implYy")), str(it.get("implSeq"))), []).append(it)
    rows = []
    for (yy, seq), its in sorted(groups.items()):
        its.sort(key=lambda x: str(x.get("docExamStartDt") or ""))
        first = its[0]
        if len(its) >= 2:   # 단계별 2줄로 온 경우
            second = its[1]
            prac_s, prac_e, final = second.get("docExamStartDt"), second.get("docExamEndDt"), second.get("docPassDt")
        else:               # 한 줄에 필기·실기가 다 들어온 경우
            prac_s, prac_e, final = first.get("pracExamStartDt"), first.get("pracExamEndDt"), first.get("pracPassDt")
        last = _d(final) or _d(first.get("docPassDt"))
        if last and last < TODAY - datetime.timedelta(days=30): continue   # 끝난 지 한 달 넘은 회차는 숨김
        reg = _md(first.get("docRegStartDt"), first.get("docRegEndDt"))
        parts = [f"报名 <strong>{reg}</strong>" if reg else "",
                 f"笔试 {_md(first.get('docExamStartDt'), first.get('docExamEndDt'))}" if first.get("docExamStartDt") else "",
                 f"笔试发榜 {_md(first.get('docPassDt'))}" if first.get("docPassDt") else "",
                 f"{prac_zh} {_md(prac_s, prac_e)}" if prac_s else "",
                 f"最终发榜 {_md(final)}" if final else ""]
        rows.append(f"<strong>{esc(yy)} 年</strong>：" + " · ".join(x for x in parts if x))
    if not rows: return '<span class="zh">今年的考试已结束，明年日程公布后这里自动更新。</span>'
    return "<br>".join(rows)

def main():
    what = next((a for a in sys.argv[1:] if not a.startswith("--")), "all")
    changed = False
    if what in ("notice", "all"):
        items = notice_sample() if SAMPLE else notice_fetch()
        if items is None: print("notice: 접속 실패 또는 0건 → 기존 내용 유지")
        else:   # 2026-10-28: 4개 게시판 → 首尔市消息 표 하나 (날짜순, 게시판 이름은 작은 글씨 + 위 버튼으로 거르기)
            keep = []
            for b, ko, zh in BOARDS:
                got = [x for x in items if x["board"] == b][:NOTICE_MAX]
                print(f"notice {b}: {len(got)}"); keep += got
            # 2026-10-28 15:52: 서울시 「참여 신청」도 뺌(月亮妈妈 「可报名 안 해도 돼요」) — seoul_events_fetch는 남겨 두고 부르지 않음
            try: keep += seoul_news_sample() if SAMPLE else seoul_news_fetch()
            except Exception as e: print("seoul news failed", e)
            keep.sort(key=lambda x: x["date"], reverse=True)
            changed |= replace_block("butie.html", "INFO", notice_render(keep), "info-stamp")
    if what in ("exam", "all") and (SAMPLE or KEY):
        for tag, qg, jm, name, prac in EXAMS:
            items = exam_sample() if SAMPLE else exam_fetch(qg, jm)
            if items: changed |= replace_block("mama.html", tag, exam_render(items, prac) + "\n", "exam-stamp")
            else: print(f"exam {name}: 0건 → 기존 내용 유지")
    if what in ("hangang", "tour", "all"):   # 열쇠 불필요 → KEY 검사 앞에서 실행
        items = hangang_sample() if SAMPLE else hangang_fetch()
        if items is None: print("hangang: 접속 실패 → 기존 내용 유지")
        else: changed |= replace_block("lvyou.html", "HANGANG", hangang_render(items), "hangang-stamp")
    if not SAMPLE and not KEY:
        print("APPLYHOME_KEY 없음 → 공공데이터 3종 건너뜀"); what = "none"
    if what == "welfare":   # 2026-10-02 정부지원 항목 폐지 → 자동 실행(all)에서 제외
        items = welfare_sample() if SAMPLE else welfare_fetch()
        if items: changed |= replace_block("butie.html", "WELFARE", welfare_render(items), "welfare-stamp")
        else: print("welfare: 0건 → 기존 내용 유지")
    if what in ("tour", "all"):
        items = tour_sample() if SAMPLE else tour_fetch()
        if items: changed |= replace_block("lvyou.html", "TOUR", tour_render(items), "tour-stamp")
        else: print("tour: 0건 → 기존 내용 유지")
    if what in ("apt", "all"):
        ym, rows = apt_sample() if SAMPLE else apt_fetch()
        got = [r for r in rows if r["n"]]
        print("apt:", ym, "구", len(got), "/ 25")
        if SAMPLE or len(got) >= 20: changed |= replace_block("zhufang.html", "APT", apt_render(ym, rows), "apt-stamp")   # 일부만 받았으면 표를 덮지 않음
        else: print("apt: 데이터 부족 → 기존 표 유지")
        deals = apt_recent_sample() if SAMPLE else apt_recent_fetch()
        if deals is None: print("apt recent: 실패 → 기존 내용 유지")
        else: changed |= replace_block("zhufang.html", "APTNOW", apt_recent_render(deals), "apt-stamp")
        news = house_news_sample() if SAMPLE else house_news_fetch()
        if news: changed |= replace_block("zhufang.html", "HNEWS", house_news_render(news), "apt-stamp")
    if changed:
        sm = os.path.join(HERE, "sitemap.xml")
        if os.path.exists(sm):
            t = open(sm, encoding="utf-8").read()
            t = re.sub(r"(<loc>https://hanzhinan.com/(butie|lvyou|zhufang|mama)</loc><lastmod>)[0-9-]+", lambda m: m.group(1) + TODAY.isoformat(), t)
            open(sm, "w", encoding="utf-8").write(t)

if __name__ == "__main__":
    main()
