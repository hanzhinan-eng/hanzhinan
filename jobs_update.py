#!/usr/bin/env python3
# 한울타리(서울시가족센터) 구인공고 → 中国·中文 관련만 골라 gongzuo.html 「招聘」 탭에 카드로
# 실행: python3 jobs_update.py            (--sample: 견본 데이터, 네트워크 없음)
# 표준 라이브러리만. 본문은 베끼지 않고 제목·기관·조건 요약·원문 링크만.
import os, sys, re, json, time, html, datetime, urllib.request

KST = datetime.timezone(datetime.timedelta(hours=9))
TODAY = datetime.datetime.now(KST).date()
HERE = os.path.dirname(os.path.abspath(__file__))
SAMPLE = "--sample" in sys.argv
BASE = "https://mcfamily.or.kr"
PAGES = 6            # 목록 6쪽 × 16건 ≈ 최근 두세 달
MAX_CARDS = 30
SEEN = os.path.join(HERE, "jobs_seen.json")   # id → 상세 필드 (한 번 읽은 공고는 다시 안 읽음)
STAMP = f"{TODAY.year}.{TODAY.month}.{TODAY.day} 自动更新"

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
def days_zh(s):
    return re.sub(r"[월화수목금토일]", lambda m: DAY_ZH[m.group(0)], s).replace("~", "～") if s else ""
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
        top = f'<span class="tag ok">{esc(dd)}</span> ' if dd.startswith("D-") and int(dd[2:]) <= 7 or dd == "今天截止" else ""
        top += f'<span class="tag info">{" · ".join(tags) or "招聘"}</span>'
        when = " ".join(x for x in [days_zh(d.get("근무요일", "")), esc(d.get("근무시간", ""))] if x)
        kv = ""
        if d.get("모집직종"): kv += f'        <dt>职种</dt><dd>{esc(d["모집직종"])}</dd>\n'
        kv += f'        <dt>地区</dt><dd>{esc(region_zh(d.get("근무지역") or it["region"]))}{(" · " + esc(d["인근전철역"])) if d.get("인근전철역") else ""}</dd>\n'
        if d.get("임금"): kv += f'        <dt>工资</dt><dd>{esc(d["임금"])}</dd>\n'
        wf = " · ".join(x for x in [when, esc(d.get("고용형태", ""))] if x)
        if wf: kv += f'        <dt>时间·形态</dt><dd>{wf}</dd>\n'
        kv += f'        <dt>截止</dt><dd>{esc(it["end"] or d.get("마감일", ""))}{(" · " + dd) if dd else ""} · <a href="{BASE}/jobs/opening/{it["id"]}" target="_blank" rel="noopener">한울타리 原文</a></dd>\n'
        cards.append(f'''    <article class="ntc">
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
    new = re.sub(rf'(<span class="today-day" id="{stamp_id}">).*?(</span>)', lambda m: m.group(1) + ("한울타리 " if stamp_id == "jobs-stamp" else "다누리 ") + STAMP + m.group(2), new)
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
def danuri_fetch(pages=4):
    out, seen = [], set()
    for p in range(1, pages + 1):
        url = f"{DANURI}/list.do?cpage={p}&rows=10"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (hanzhinan-bot; +https://hanzhinan.com)", "Accept-Language": "ko"})
            with urllib.request.urlopen(req, timeout=60) as r: page = r.read().decode("utf-8", "replace")
        except Exception as e:
            print("danuri failed", p, e); break
        hits = list(re.finditer(r'article_seq=(\d+)[^>]*>(.*?)</a>', page, re.S))
        print(f"danuri p{p}: bytes={len(page)} anchors={len(hits)}")
        if p == 1 and hits:
            i = hits[0].start(); print("  danuri sample:", re.sub(r"\s+", " ", page[max(0, i - 300):i + 700]))
        for m in hits:
            sid = m.group(1)
            title = html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", m.group(2)))).strip()
            if sid in seen or len(title) < 4: continue
            seen.add(sid)
            win = page[m.end():m.end() + 900]
            dm = re.search(r"(20\d\d)[-.](\d{1,2})[-.](\d{1,2})", win)
            rm = REGION.search(re.sub(r"<[^>]+>", " ", win))
            out.append({"id": sid, "title": title, "date": f"{dm.group(1)}-{int(dm.group(2)):02d}-{int(dm.group(3)):02d}" if dm else "", "region": rm.group(0).strip() if rm else ""})
        time.sleep(0.5)
    keep = []
    for it in out:
        if not NAT_KEEP.search(it["title"]) or NAT_SKIP.search(it["title"]): continue
        if it["date"] and it["date"] < (TODAY - datetime.timedelta(days=45)).isoformat(): continue
        keep.append(it)
    print("danuri listed", len(out), "kept", len(keep))
    return out, keep[:30]
def nat_render(items):
    if not items: return '        <tr><td colspan="3"><span class="zh">这周没有标题里写中国·中文·通翻译的岗位。</span><span class="ko">이번 주 해당 공고 없음.</span></td></tr>\n'
    rows = []
    for it in items:
        d = it["date"]; ds = f"{int(d[5:7])}.{int(d[8:10])}" if d else ""
        sub = f'<small class="nt-sub">{esc(it["region"])}</small>' if it["region"] else ""
        rows.append(f'        <tr><td><span lang="ko">{esc(it["title"])}</span>{sub}</td><td class="nt-d">{ds}</td><td class="nt-l"><a href="{DANURI}/view.do?article_seq={it["id"]}" target="_blank" rel="noopener"><span class="zh">原文</span><span class="ko">원문</span> ↗</a></td></tr>\n')
    return "".join(rows)
def nat_update():
    if SAMPLE:
        keep = [{"id": "169574", "title": "동래구가족센터 통번역지원사 모집 채용 공고", "date": "2026-10-18", "region": "부산 동래구"}]; listed = keep
    else:
        listed, keep = danuri_fetch()
    if not listed: print("danuri: 0건 → 기존 내용 유지"); return False
    return replace_block("gongzuo.html", "JOBS_NAT", nat_render(keep), "nat-stamp")

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
    if changed:
        sm = os.path.join(HERE, "sitemap.xml")
        if os.path.exists(sm):
            t = open(sm, encoding="utf-8").read()
            t = re.sub(r"(<loc>https://hanzhinan.com/gongzuo</loc><lastmod>)[0-9-]+", lambda m: m.group(1) + TODAY.isoformat(), t)
            open(sm, "w", encoding="utf-8").write(t)

if __name__ == "__main__":
    main()
