#!/usr/bin/env python3
# 한울타리(서울시가족센터) 구인공고 → 中国·中文 관련만 골라 gongzuo.html 「招聘」 탭에 카드로
# 실행: python3 jobs_update.py            (--sample: 견본 데이터, 네트워크 없음)
# 표준 라이브러리만. 본문은 베끼지 않고 제목·기관·조건 요약·원문 링크만.
import os, sys, re, json, time, html, datetime, urllib.request, urllib.parse

# ★ 원칙 (2026-11-09, 月亮妈妈): 매주 월요일 자동 업데이트 때 마감이 지난 내용은 지운다.
KST = datetime.timezone(datetime.timedelta(hours=9))
TODAY = datetime.datetime.now(KST).date()
HERE = os.path.dirname(os.path.abspath(__file__))
SAMPLE = "--sample" in sys.argv
BASE = "https://mcfamily.or.kr"
PAGES = 6            # 목록 6쪽 × 16건 ≈ 최근 두세 달
MAX_CARDS = 30
SEEN = os.path.join(HERE, "jobs_seen.json")   # id → 상세 필드 (한 번 읽은 공고는 다시 안 읽음)
STAMP = f"{TODAY.year}.{TODAY.month}.{TODAY.day} 更新"

def esc(t): return html.escape(str(t or ""), quote=False)
def get(path):
    req = urllib.request.Request(BASE + path, headers={"User-Agent": "Mozilla/5.0 (hanzhinan-bot; +https://hanzhinan.com)", "Accept-Language": "ko"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8", "replace")

# ---------- 목록 ----------
ITEM = re.compile(r'<a class="[^"]*" href="/jobs/opening/(\d+)\?[^"]*">(.*?)</a>\s*</li>', re.S)
def parse_list(page_html):
    out = []
    for m in ITEM.finditer(page_html):
        jid, body = m.group(1), m.group(2)
        status = (re.search(r'rounded-2xl"[^>]*>([^<]+)</span>', body) or [None, ""])[1].strip()
        region = (re.search(r'leading-6">([^<]*)</span>', body) or [None, ""])[1].strip()
        title = html.unescape(re.sub(r"<[^>]+>", "", (re.search(r'<p class="mh8[^"]*">(.*?)</p>', body, re.S) or [None, ""])[1])).strip()
        dates = re.findall(r"\d{4}-\d{2}-\d{2}", body)
        out.append({"id": jid, "status": status, "region": region, "title": title,
                    "start": dates[0] if dates else "", "end": dates[1] if len(dates) > 1 else ""})
    return out

# ---------- 상세 ----------
FIELD = re.compile(r'<img alt="([^"]+)"[^>]*/>\1</div><div class="inline-block break-all">\s*(.*?)</div>', re.S)
def parse_detail(page_html):
    f = {}
    for k, v in FIELD.findall(page_html):
        f[k] = html.unescape(re.sub(r"<[^>]+>", "", v)).strip()
    m = re.search(r'작성일<!-- --> : <span>([\d-]+)</span>', page_html)
    f["작성일"] = m.group(1) if m else ""
    return f

# ---------- 판별: 中国·中文 관련인가 ----------
KW = re.compile(r"중국|中国|中文|중문|화교|조선족|한족|대만|臺灣|台湾|홍콩|香港", re.I)
OTHER = re.compile(r"베트남|몽골|네팔|태국|필리핀|우즈벡|러시아|캄보디아|일본|미얀마|인도네시아|방글라|스페인|영어|아랍|프랑스|독일")
ANY = ("", "무관", "국적무관", "언어무관", "없음")
def classify(item, d):
    """'cn' = 中国·中文 지정 / 'any' = 국적·언어 불문(중국인도 지원 가능) / None = 다른 나라 지정"""
    t = item["title"]; c = d.get("출신국", "").strip(); l = d.get("모집언어", "").strip()
    if KW.search(t) or "중국" in c or "중국어" in l: return "cn"
    if c in ANY and l in ANY and not OTHER.search(t): return "any"
    return None

# ---------- 中文 라벨 ----------
GU_ZH = {"종로구":"钟路区","중구":"中区","용산구":"龙山区","성동구":"城东区","광진구":"广津区","동대문구":"东大门区","중랑구":"中浪区","성북구":"城北区","강북구":"江北区","도봉구":"道峰区","노원구":"芦原区","은평구":"恩平区","서대문구":"西大门区","마포구":"麻浦区","양천구":"阳川区","강서구":"江西区","구로구":"九老区","금천구":"衿川区","영등포구":"永登浦区","동작구":"铜雀区","관악구":"冠岳区","서초구":"瑞草区","강남구":"江南区","송파구":"松坡区","강동구":"江东区"}
CN_ZH = {"중국":"中国","베트남":"越南","네팔":"尼泊尔","몽골":"蒙古","태국":"泰国","방글라데시":"孟加拉","필리핀":"菲律宾","우즈베키스탄":"乌兹别克斯坦","러시아":"俄罗斯","캄보디아":"柬埔寨","일본":"日本","대만":"台湾","미얀마":"缅甸","인도네시아":"印度尼西亚","한국":"韩国","국적무관":"不限国籍","무관":"不限"}
LANG_ZH = {"중국어":"中文","베트남어":"越南语","영어":"英语","한국어":"韩语","일본어":"日语","러시아어":"俄语","몽골어":"蒙古语","태국어":"泰语","네팔어":"尼泊尔语","방글라데시어":"孟加拉语","인도네시아어":"印尼语","스페인어":"西班牙语","필리핀어":"菲律宾语","무관":"不限"}
DAY_ZH = {"월":"一","화":"二","수":"三","목":"四","금":"五","토":"六","일":"日"}
def zh_list(s, table):
    parts = [p.strip() for p in re.split(r"[,、/]", s) if p.strip()]
    return "、".join(table.get(p, p) for p in parts) if parts else ""
def region_zh(s):
    s = s.replace("서울특별시", "首尔").replace("경기도", "京畿").replace("인천광역시", "仁川")
    for ko, zh in GU_ZH.items(): s = s.replace(ko, zh)
    return s
# 자주 나오는 한국어 표현 → 中文 (2026-11-16). 표에 없는 말은 한국어 그대로 둔다(틀린 번역보다 원문이 안전).
KO_ZH = [
    (r"기간의 정함이 없는 근로계약", "无固定期限合同"), (r"기간의 정함이 있는 근로계약", "固定期限合同"),
    (r"계약만료 후 상용직 전환 검토", "合同期满后考虑转正"), (r"정규직 전환 가능", "可转正"),
    (r"수습기간 (\d+)개월 이후 정규계약", r"试用期\1个月后转正"), (r"수습 (\d+)개월", r"试用期\1个月"),
    (r"근무기간 (\d+)개월", r"工作期\1个月"), (r"(\d+)개월", r"\1个月"),
    (r"(\d{4})년 ?(\d+)월부터", r"\1年\2月起"), (r"(\d{4})년부터", r"\1年起"), (r"(\d+)년", r"\1年"),
    (r"(\d+)월 ?(\d+)일", r"\1月\2日"), (r"(\d+)월", r"\1月"), (r"적용", "适用"),
    (r"파견근로", "派遣"), (r"정규직", "正式工"), (r"계약직", "合同工"), (r"상근직", "全职"),
    (r"아르바이트", "兼职"), (r"파트타임", "兼职"), (r"프리랜서", "自由职业"), (r"인턴", "实习"), (r"시간강사", "课时讲师"),
    (r"직무별 상이", "因岗位而异"), (r"스케쥴에 따라 상이", "按排班而定"), (r"스케쥴 근무", "排班制"), (r"탄력근무제", "弹性工作制"),
    (r"격주 근무", "隔周上班"),
    (r"면접 후 결정", "面试后决定"), (r"면접 후 협의", "面试后面议"), (r"협의 후 결정", "面议后决定"),
    (r"협의 가능", "可面议"), (r"협의", "面议"),
    (r"회사 내규에 따름", "按公司规定"), (r"회사 규정에 따라 책정", "按公司规定"),
    (r"경력직의 경우 직전 연봉 우대", "有经验者参考上一份年薪"),
    (r"식대 및 주휴수당 포함", "含餐费和周休补贴"), (r"휴게 (\d+)시간 포함", r"含休息\1小时"),
    (r"하루 (\d+)시간", r"每天\1小时"), (r"주 ?(\d)일", r"每周\1天"), (r"(\d+)시간", r"\1小时"), (r"기준", "标准"),
    (r"시급", "时薪"), (r"월급", "月薪"), (r"연봉", "年薪"), (r"일급", "日薪"), (r"월 ?(?=\d)", "月薪 "),
    (r"(\d)천원", r"\1千韩元"), (r"(\d)만원", r"\1万韩元"), (r"(\d)원", r"\1韩元"), (r"韩元 ?이상", "韩元以上"),
    (r" 또는 ", " 或 "),
]
def ko_zh(s):
    for pat, rep in KO_ZH: s = re.sub(pat, rep, s)
    return s
def days_zh(s):
    if not s: return ""
    s = re.sub(r"([월화수목금토일])요일", lambda m: "周" + DAY_ZH[m.group(1)], s)   # 토요일 → 周六
    s = ko_zh(s)
    # 요일 글자만 따로 있을 때만 바꾼다 (다른 한글 단어 속 글자는 건드리지 않음)
    s = re.sub(r"(?<![가-힣\d])[월화수목금토일]+(?![가-힣])", lambda m: "".join(DAY_ZH[c] for c in m.group(0)), s)
    return esc(s.replace("~", "～"))
def dday(end):
    try:
        e = datetime.date.fromisoformat(end); n = (e - TODAY).days
        return f"D-{n}" if n > 0 else ("今天截止" if n == 0 else "")
    except Exception: return ""

# ---------- 렌더 ----------
def render(items):
    cn = [i for i in items if i.get("group") == "cn"]; anyg = [i for i in items if i.get("group") == "any"]
    out = '    <h2 class="zh">指定中国·中文的岗位</h2><h2 class="ko">중국·중국어 지정 공고</h2>\n'
    out += cards(cn) if cn else '    <p class="note"><span class="zh">这两个月没有指定中国人·中文的招聘。每周一自动更新。</span><span class="ko">최근 두 달 중국·중국어 지정 공고가 없어요. 매주 월요일 자동 갱신.</span></p>\n'
    out += '    <h2 class="zh">不限国籍·语言（中国人也能报）</h2><h2 class="ko">국적·언어 무관 공고</h2>\n'
    out += cards(anyg) if anyg else '    <p class="note"><span class="zh">这两个月没有不限国籍的招聘。</span><span class="ko">최근 두 달 국적 무관 공고가 없어요.</span></p>\n'
    return out
def cards(items):
    cards = []
    for it in items:
        d = it["detail"]
        tags = []
        if d.get("출신국"): tags.append("出身国 " + esc(zh_list(d["출신국"], CN_ZH)))
        if d.get("모집언어"): tags.append("语言 " + esc(zh_list(d["모집언어"], LANG_ZH)))
        dd = dday(it["end"])
        top = f'<span class="tag ok dd-tag">{esc(dd)}</span> ' if dd.startswith("D-") and int(dd[2:]) <= 7 or dd == "今天截止" else ""
        top += f'<span class="tag info">{" · ".join(tags) or "招聘"}</span>'
        when = " ".join(x for x in [days_zh(d.get("근무요일", "")), esc(ko_zh(d.get("근무시간", "")))] if x)
        kv = ""
        if d.get("모집직종"): kv += f'        <dt>职种</dt><dd>{esc(d["모집직종"])}</dd>\n'
        kv += f'        <dt>地区</dt><dd>{esc(region_zh(d.get("근무지역") or it["region"]))}{(" · " + esc(d["인근전철역"])) if d.get("인근전철역") else ""}</dd>\n'
        if d.get("임금"): kv += f'        <dt>工资</dt><dd>{esc(ko_zh(d["임금"]))}</dd>\n'
        wf = " · ".join(x for x in [when, esc(ko_zh(d.get("고용형태", "")))] if x)
        if wf: kv += f'        <dt>时间·形态</dt><dd>{wf}</dd>\n'
        kv += f'        <dt>截止</dt><dd>{esc(it["end"] or d.get("마감일", ""))}<span class="dd-txt">{(" · " + dd) if dd else ""}</span> · <a href="{BASE}/jobs/opening/{it["id"]}" target="_blank" rel="noopener">한울타리 原文</a></dd>\n'
        cards.append(f'''    <article class="ntc" data-end="{esc(it["end"])}">
      <div class="ntc-top">{top}</div>
      <h3>{esc(it["title"])}</h3>
      <dl class="kv">
{kv}      </dl>
    </article>
''')
    return "".join(cards)

def replace_block(path, tag, body, stamp_id):
    p = os.path.join(HERE, path); h = open(p, encoding="utf-8").read()
    new = re.sub(rf"(<!-- {tag}:START -->\n).*?(<!-- {tag}:END -->)", lambda m: m.group(1) + body + m.group(2), h, flags=re.S)
    new = re.sub(rf'(<span class="today-day" id="{stamp_id}">).*?(</span>)', lambda m: m.group(1) + STAMP + m.group(2), new)
    if new != h:
        open(p, "w", encoding="utf-8").write(new); print(f"{path}: {tag} updated"); return True
    print(f"{path}: {tag} no change"); return False

def sample():
    return [{"id": "14907", "status": "모집중", "region": "서울특별시 중랑구", "title": "[굿모닝코리아] 통번역 및 인바운드 상담 매니저 모집(네팔, 방글라데시, 중국, 몽골, 태국)", "start": "2026-09-15", "end": "2026-10-05",
             "detail": {"출신국": "네팔, 몽골, 방글라데시, 중국, 태국", "모집직종": "고객관리", "모집언어": "네팔어, 몽골어, 방글라데시어, 중국어, 태국어", "고용형태": "기간의 정함이 있는 근로계약(12개월)", "인근전철역": "중화역(7호선)", "근무시간": "10:00~17:00", "근무요일": "월~금", "근무지역": "서울특별시 중랑구", "임금": "월급 250만원 이상", "작성일": "2026-09-15"}},
            {"id": "14900", "status": "모집중", "region": "서울특별시 은평구", "title": "[서울진관고등학교] 진관고 이중언어강사(중국어) 채용 공고", "start": "2026-09-14", "end": "2026-09-20",
             "detail": {"출신국": "중국", "모집직종": "교육", "모집언어": "중국어", "고용형태": "시간강사", "근무요일": "월~금", "근무지역": "서울특별시 은평구", "임금": "시급 협의", "작성일": "2026-09-14"}}]


# ---------- 전국: 다누리 가족센터 채용정보 (2026-10-06) ----------
# 목록 HTML을 세션에서 직접 못 봐서(프록시 차단) 느슨한 파서. 첫 실행 로그의 "danuri" 줄로 확인·조정할 것
DANURI = "https://www.liveinkorea.kr/web/lay1/bbs/S1T10C29/A/6"
NAT_KEEP = re.compile(r"중국|중문|통번역|번역|통역|이중언어")
NAT_SKIP = re.compile(r"결과|합격|발표|면접전형|서류전형|취소|연기")
REGION = re.compile(r"(서울|부산|대구|인천|광주|대전|울산|세종|경기|강원|충북|충남|전북|전남|경북|경남|제주)[^<]{0,4}?\s*[가-힣]{1,5}(?:구|군|시)")
def danuri_parse(page):
    # 10-06 실제 구조 확인: <dl><dt><div><span>[ 지역 ]</span></div><a href="view.do?article_seq=N…"><span>제목</span></a></dt>
    #                       <dd><ul><li>채용기간</li><li>시작 ~ 마감</li><li>접수|예정|완료</li></ul></dd></dl>
    out = []
    for chunk in re.split(r"<dl[\s>]", page)[1:]:
        chunk = chunk.split("</dl>")[0]
        m = re.search(r"article_seq=(\d+)[^>]*>(.*?)</a>", chunk, re.S)
        if not m or "채용기간" not in chunk: continue
        txt = lambda h: html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", h))).strip()
        rg = re.search(r"\[\s*([^\]<]{2,20}?)\s*\]", txt(chunk[:m.start()]))
        ds = re.findall(r"(20\d\d)-(\d\d)-(\d\d)", chunk[m.end():])
        st = re.search(r"(접수|예정|완료)", txt(chunk[m.end():]).replace("채용기간", ""))
        out.append({"id": m.group(1), "title": txt(m.group(2)), "region": rg.group(1) if rg else "",
                    "start": "-".join(ds[0]) if ds else "", "end": "-".join(ds[1]) if len(ds) > 1 else "",
                    "status": st.group(1) if st else ""})
    return out
DANURI_QUERIES = [("중국", ""), ("이중언어", "TITLE"), ("통번역", "TITLE"), ("번역", "TITLE")]   # (검색어, ""=제목+내용 / TITLE=제목)
def danuri_fetch():
    seen, keep, listed = set(), [], 0
    for kw, cond in DANURI_QUERIES:
        for stat in ("02", "01"):   # 02 접수 · 01 예정
            url = f"{DANURI}/list.do?cpage=1&rows=50&condition={cond}&keyword={urllib.parse.quote(kw)}&search_recruit_stat={stat}"
            try:
                req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (hanzhinan-bot; +https://hanzhinan.com)", "Accept-Language": "ko"})
                with urllib.request.urlopen(req, timeout=60) as r: page = r.read().decode("utf-8", "replace")
            except Exception as e:
                print("danuri failed", kw, stat, e); continue
            items = danuri_parse(page); listed += len(items)
            print(f"danuri {kw}/{cond or 'ALL'}/{stat}: bytes={len(page)} items={len(items)}")
            for it in items:
                if it["id"] in seen or NAT_SKIP.search(it["title"]): continue
                if it["end"] and it["end"] < TODAY.isoformat(): continue
                seen.add(it["id"]); it["cn"] = (kw == "중국"); keep.append(it)
            time.sleep(0.5)
    keep.sort(key=lambda x: x["end"] or "9999")
    print("danuri listed", listed, "kept", len(keep))
    return listed, keep[:30]
def nat_render(items):
    if not items: return '        <tr><td colspan="3"><span class="zh">这周没有正在招聘的中文·通翻译·双语岗位。</span><span class="ko">이번 주 접수 중인 해당 공고 없음.</span></td></tr>\n'
    rows = []
    for it in items:
        e = it["end"]; ds = f"{int(e[5:7])}.{int(e[8:10])}" if e and e < "2100" else '<span class="zh">长期</span><span class="ko">상시</span>'
        tag = '<span class="tag ok" data-ko="중국어">中文</span> ' if it.get("cn") else ""
        stt = '<span class="tag info" data-ko="예정">即将开始</span> ' if it.get("status") == "예정" else ""
        sub = f'<small class="nt-sub">{esc(it["region"])}</small>' if it["region"] else ""
        rows.append(f'        <tr><td>{tag}{stt}<span lang="ko">{esc(it["title"])}</span>{sub}</td><td class="nt-d"><span class="zh">截止</span><span class="ko">마감</span> {ds}</td><td class="nt-l"><a href="{DANURI}/view.do?article_seq={it["id"]}" target="_blank" rel="noopener"><span class="zh">原文</span><span class="ko">원문</span> ↗</a></td></tr>\n')
    return "".join(rows)
def nat_update():
    if SAMPLE:
        keep = [{"id": "169574", "title": "동래구가족센터 통번역지원사 모집 채용 공고", "start": "2026-10-02", "end": "2026-10-18", "region": "부산 동래구", "status": "접수", "cn": True}]; listed = 1
    else:
        listed, keep = danuri_fetch()
    if not listed: print("danuri: 0건 → 기존 내용 유지"); return False
    return replace_block("gongzuo.html", "JOBS_NAT", nat_render(keep), "nat-stamp")

# ---------- 서울시 외국인주민센터 채용공고 (MY SEOUL+, 2026-11-10) ----------
# 月亮妈妈 요청: global.seoul.go.kr 채용공고 게시판(bbs_no=8)을 「招聘 › 外国人中心」 탭에.
# 목록 = POST bordContListPgng.do (miv_pageNo, miv_pageSize). 합격자·결과 발표 글은 뺀다.
# 마감 = 상세 본문에서 「접수」 근처 날짜 범위의 끝. 본문에 없으면(첨부파일에만 있음) 게시 21일 이내만 「截止见原文」로 둠.
# 같은 센터의 합격자·결과 발표가 더 나중에 올라왔으면 이미 마감된 것으로 보고 뺀다.
FRC = "https://global.seoul.go.kr/hmpg/finf/empl/recr"
FRC_SKIP = re.compile(r"결과|합격|발표|면접전형|서류전형|취소|연기")
FRC_RANGE = re.compile(r"(20\d\d)\s*\.\s*(\d{1,2})\s*\.\s*(\d{1,2})\s*\.?\s*(?:\([^)]{0,6}\))?\s*(?:\d{1,2}:\d\d)?\s*[~∼～\-]\s*(?:(20\d\d)\s*\.\s*)?(\d{1,2})\s*\.\s*(\d{1,2})")
FRC_CENTER = re.compile(r"([가-힣A-Za-z0-9]{2,20}?(?:외국인주민센터|글로벌빌리지센터|글로벌센터|이주여성상담센터|글로벌청소년교육센터|센터))")
def frc_req(path, data=None):
    body = urllib.parse.urlencode(data).encode() if data else None
    req = urllib.request.Request(FRC + path, data=body, headers={"User-Agent": "Mozilla/5.0 (hanzhinan-bot; +https://hanzhinan.com)", "Accept-Language": "ko",
        **({"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", "X-Requested-With": "XMLHttpRequest"} if data else {})})
    with urllib.request.urlopen(req, timeout=60) as r: return r.read().decode("utf-8", "replace")
def frc_text(h): return html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", h, flags=re.S))))
def frc_end(txt):
    js = [m.start() for m in re.finditer("접수", txt)]
    for m in FRC_RANGE.finditer(txt):
        if any(0 <= m.start() - j < 40 for j in js):
            try: return datetime.date(int(m.group(4) or m.group(1)), int(m.group(5)), int(m.group(6))).isoformat()
            except ValueError: return ""
    return ""
def frc_fetch():
    page = frc_req("/bordContListPgng.do", {"bbs_no": "8", "miv_pageNo": "1", "miv_pageSize": "40"})
    rows = []
    for tr in re.findall(r"<tr[^>]*>(.*?)</tr>", page, re.S):
        m = re.search(r"contDetail\('([0-9A-Fa-f]+)'\)[^>]*>(.*?)</a>", tr, re.S)
        d = re.search(r'class="date"[^>]*>\s*(20\d\d-\d\d-\d\d)', tr)
        if m and d: rows.append({"id": m.group(1), "title": frc_text(m.group(2)).strip(), "date": d.group(1)})
    print("frc listed", len(rows), "bytes", len(page))
    keep = []
    for i, it in enumerate(rows):
        if FRC_SKIP.search(it["title"]): continue
        posted = datetime.date.fromisoformat(it["date"])
        if (TODAY - posted).days > 60: continue
        cm = FRC_CENTER.search(it["title"]); it["center"] = cm.group(1) if cm else ""
        # 같은 센터의 더 나중 합격자·결과 발표 → 마감
        if it["center"] and any(FRC_SKIP.search(r["title"]) and it["center"] in r["title"] and r["date"] > it["date"] for r in rows): continue
        try: it["end"] = frc_end(frc_text(frc_req(f"/bordContDetail.do?mode=W&bbs_no=8&pst_no={it['id']}"))); time.sleep(0.5)
        except Exception as e: print("frc detail failed", it["id"], e); it["end"] = ""
        if it["end"]:
            if it["end"] < TODAY.isoformat(): continue
        elif (TODAY - posted).days > 21: continue
        keep.append(it)
    keep.sort(key=lambda x: x["end"] or "9999")
    print("frc kept", len(keep), [k["end"] for k in keep])
    return len(rows), keep
def frc_render(items):
    if not items: return '        <tr><td colspan="3"><span class="zh">这周外国人中心没有正在招聘的岗位。每周一自动更新。</span><span class="ko">이번 주 접수 중인 외국인주민센터 채용 공고 없음.</span></td></tr>\n'
    out = []
    for it in items:
        e = it["end"]
        ds = f'<span class="zh">截止</span><span class="ko">마감</span> {int(e[5:7])}.{int(e[8:10])}' if e else '<span class="zh">截止见原文</span><span class="ko">마감 원문 확인</span>'
        sub = f'<small class="nt-sub"><span class="zh">发布 {int(it["date"][5:7])}.{int(it["date"][8:10])}</span><span class="ko">게시 {int(it["date"][5:7])}.{int(it["date"][8:10])}</span></small>'
        out.append(f'        <tr data-end="{esc(e)}"><td><span lang="ko">{esc(it["title"])}</span>{sub}</td><td class="nt-d">{ds}</td><td class="nt-l"><a href="{FRC}/bordContDetail.do?mode=W&amp;bbs_no=8&amp;pst_no={esc(it["id"])}" target="_blank" rel="noopener"><span class="zh">原文</span><span class="ko">원문</span> ↗</a></td></tr>\n')
    return "".join(out)
def frc_update():
    if SAMPLE:
        listed, keep = 1, [{"id": "5F04B0B113290102E063C0A8A022E581", "title": "양천외국인주민센터 직원(정규직) 채용 공고", "date": "2026-11-02", "end": "2026-11-19"}]
    else:
        try: listed, keep = frc_fetch()
        except Exception as e: print("frc failed → 기존 유지", e); return False
    if not listed: print("frc: 0건 → 기존 유지"); return False
    return replace_block("gongzuo.html", "JOBS_FRC", frc_render(keep), "frc-stamp")


def main():
    if SAMPLE:
        items = sample()
        for it in items: it["group"] = classify(it, it["detail"])
    elif "--json" in sys.argv:   # 브라우저에서 받아온 목록+상세 JSON으로 렌더 (첫 스냅샷용)
        items = json.load(open(sys.argv[sys.argv.index("--json") + 1], encoding="utf-8"))
        for it in items: it["group"] = classify(it, it["detail"])
        items = [i for i in items if i["group"]]; items.sort(key=lambda x: x["start"], reverse=True)
    else:
        seen = json.load(open(SEEN, encoding="utf-8")) if os.path.exists(SEEN) else {}
        listed = []
        for p in range(1, PAGES + 1):
            try: listed += parse_list(get(f"/jobs/opening?page={p}"))
            except Exception as e: print("list failed", p, e); break
            time.sleep(0.5)
        print("listed", len(listed))
        items = []
        for it in listed:
            if it["status"] != "모집중": continue
            if it["end"] and it["end"] < TODAY.isoformat(): continue
            d = seen.get(it["id"])
            if d is None:
                try: d = parse_detail(get(f"/jobs/opening/{it['id']}")); time.sleep(0.5)
                except Exception as e: print("detail failed", it["id"], e); d = {}
                seen[it["id"]] = d
            it["detail"] = d; it["group"] = classify(it, d)
            if it["group"]: items.append(it)
        json.dump(seen, open(SEEN, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
        items.sort(key=lambda x: x["start"], reverse=True)
        items = items[:MAX_CARDS]
        print("cn items", len(items))
    changed = replace_block("gongzuo.html", "JOBS", render(items), "jobs-stamp")
    changed = nat_update() or changed
    changed = frc_update() or changed
    if changed:
        sm = os.path.join(HERE, "sitemap.xml")
        if os.path.exists(sm):
            t = open(sm, encoding="utf-8").read()
            t = re.sub(r"(<loc>https://hanzhinan.com/gongzuo</loc><lastmod>)[0-9-]+", lambda m: m.group(1) + TODAY.isoformat(), t)
            open(sm, "w", encoding="utf-8").write(t)

if __name__ == "__main__":
    main()
