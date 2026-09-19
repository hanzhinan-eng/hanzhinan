#!/usr/bin/env python3
# 공공데이터 자동 갱신 3종 — 복지서비스(补助) · 관광행사(本月活动) · 아파트 실거래(房价)
# 실행: APPLYHOME_KEY=키 python3 data_update.py [welfare|tour|apt|all]   (--sample: 견본 데이터)
import os, sys, re, json, datetime, statistics, urllib.request, urllib.parse
import xml.etree.ElementTree as ET

KST = datetime.timezone(datetime.timedelta(hours=9))
TODAY = datetime.datetime.now(KST).date()
HERE = os.path.dirname(os.path.abspath(__file__))
KEY = os.environ.get("APPLYHOME_KEY", "")
SAMPLE = "--sample" in sys.argv
STAMP = f"{TODAY.year}.{TODAY.month}.{TODAY.day} 自动更新"

def esc(t): return str(t or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
def get(url, params, timeout=40):
    q = urllib.parse.urlencode(params)
    req = urllib.request.Request(url + "?" + q, headers={"User-Agent": "hanzhinan-bot"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8", "replace")
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
    return [{c.tag: (c.text or "").strip() for c in it} for it in root.iter("item")]
def first(it, *names):   # 신·구 필드명 중 있는 것 사용
    for n in names:
        v = it.get(n)
        if v not in (None, ""): return v
    return ""
def codes_to_zh(v, table):   # "010,020" 같은 코드면 中文으로, 이미 이름이면 그대로
    parts = [x.strip() for x in str(v or "").split(",") if x.strip()]
    if parts and all(x.isdigit() for x in parts): return "·".join(table.get(x, x) for x in parts)
    return "·".join(parts)

# ---------------- 1. 복지서비스 (补助) ----------------
WELFARE_URL = "https://apis.data.go.kr/B554287/NationalWelfareInformationsV001/NationalWelfarelistV001"
THEME_ZH = {"010": "身体健康", "020": "心理健康", "030": "生活支援", "040": "住房", "050": "工作", "060": "文化·休闲", "070": "安全·危机", "080": "怀孕·生育", "090": "托育", "100": "教育", "110": "收养·寄养", "120": "保护·照护", "130": "平民金融", "140": "法律"}
LIFE_ZH = {"001": "婴幼儿", "002": "儿童", "003": "青少年", "004": "青年", "005": "中壮年", "006": "老年", "007": "怀孕·生育"}
TARGET_ZH = {"010": "多文化·脱北民", "020": "多子女", "030": "报勋对象", "040": "残疾人", "050": "低收入", "060": "单亲·祖孙"}
QUERIES = [  # 우리 독자에게 맞는 조건만
    {"trgterIndvdlArray": "010"},                     # 다문화
    {"trgterIndvdlArray": "020"},                     # 다자녀
    {"intrsThemaArray": "100", "lifeArray": "002"},   # 교육 × 아동
    {"intrsThemaArray": "040"},                       # 주거
    {"intrsThemaArray": "090"},                       # 보육
]
def welfare_fetch():
    seen, out = set(), []
    for q in QUERIES:
        p = {"serviceKey": KEY, "callTp": "L", "pageNo": 1, "numOfRows": 50, "srchKeyCode": "003", "searchWrd": ""}
        p.update(q)
        try: items = xml_items(get(WELFARE_URL, p))
        except Exception as e: print("welfare query failed", q, e); continue
        for it in items:
            sid = it.get("servId")
            if not sid or sid in seen: continue
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
        cards.append(f'''    <article class="ntc">
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
    start = TODAY.replace(day=1); end = (start + datetime.timedelta(days=62)).replace(day=1) - datetime.timedelta(days=1)
    out = []
    for base in TOUR_BASES:
        try:
            for area in ["1", "2", "31"]:
                p = {"serviceKey": KEY, "MobileOS": "ETC", "MobileApp": "hanzhinan", "_type": "json", "numOfRows": 50, "pageNo": 1, "arrange": "A",
                     "eventStartDate": start.strftime("%Y%m%d"), "eventEndDate": end.strftime("%Y%m%d"), "areaCode": area}
                j = json.loads(get(base, p))
                items = j["response"]["body"]["items"]
                if not items: continue
                for it in items["item"]:
                    it["_area"] = AREA_ZH.get(area, area); out.append(it)
            if out: break
        except Exception as e:
            print("tour base failed", base, e); out = []
    out.sort(key=lambda x: x.get("eventstartdate", ""))
    return out[:30]
def tour_sample():
    return [{"title": "首尔灯节", "addr1": "首尔特别市中区清溪川路", "eventstartdate": "20261001", "eventenddate": "20261031", "tel": "02-120", "_area": "首尔", "firstimage": ""},
            {"title": "京畿世界陶瓷双年展", "addr1": "京畿道利川市", "eventstartdate": "20260918", "eventenddate": "20261101", "tel": "031-631-6501", "_area": "京畿", "firstimage": ""}]
def tour_render(items):
    if not items: return '    <p class="note">这两个月首尔·仁川·京畿没有登记的活动。每周一自动更新。</p>\n'
    def md(s): return f"{int(s[4:6])}.{int(s[6:8])}" if len(s) == 8 else "—"
    cards = []
    for it in items:
        s, e = it.get("eventstartdate", ""), it.get("eventenddate", "")
        on = ""
        try:
            sd, ed = datetime.date(int(s[:4]), int(s[4:6]), int(s[6:8])), datetime.date(int(e[:4]), int(e[4:6]), int(e[6:8]))
            on = "进行中" if sd <= TODAY <= ed else ("即将开始" if sd > TODAY else "")
        except Exception: pass
        tel = esc(it.get("tel"))
        cards.append(f'''    <article class="ntc">
      <div class="ntc-top"><span class="tag {"ok" if on == "进行中" else "info"}">{it.get("_area", "")}{(" · " + on) if on else ""}</span></div>
      <h3>{esc(it.get("title"))}</h3>
      <dl class="kv">
        <dt>时间</dt><dd>{md(s)} ～ {md(e)}</dd>
        <dt>地点</dt><dd>{esc(it.get("addr1")) or "见官网"}</dd>
        <dt>咨询</dt><dd>{tel or "1330（中文旅游热线）"}</dd>
      </dl>
    </article>
''')
    return "".join(cards)

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
    for code, zh, ko in GU:
        try:
            items = xml_items(get(url, {"serviceKey": KEY, "LAWD_CD": code, "DEAL_YMD": ym, "pageNo": 1, "numOfRows": 1000}))
        except Exception as e:
            print("apt failed", ko, e); items = []
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
    return f'''    <p class="note">{ym[:4]} 年 {int(ym[4:])} 月 首尔 25 区公寓<strong>实际成交</strong>：中位数成交价、每坪（3.3㎡）中位单价、成交套数。数据来自国土交通部实交易价公开系统，申报延迟约 30 天，所以显示的是两个月前的整月。单位：韩元。</p>
    <div class="tbl">
    <table>
      <thead><tr><th>区</th><th>成交价中位数</th><th>每坪中位</th><th>套数</th></tr></thead>
      <tbody>{trs}</tbody>
    </table>
    </div>
'''

def main():
    what = next((a for a in sys.argv[1:] if not a.startswith("--")), "all")
    if not SAMPLE and not KEY: sys.exit("APPLYHOME_KEY 없음 (테스트는 --sample)")
    changed = False
    if what in ("welfare", "all"):
        items = welfare_sample() if SAMPLE else welfare_fetch()
        changed |= replace_block("jiaoyu.html", "WELFARE", welfare_render(items), "welfare-stamp")
    if what in ("tour", "all"):
        items = tour_sample() if SAMPLE else tour_fetch()
        changed |= replace_block("lvyou.html", "TOUR", tour_render(items), "tour-stamp")
    if what in ("apt", "all"):
        ym, rows = apt_sample() if SAMPLE else apt_fetch()
        changed |= replace_block("zhufang.html", "APT", apt_render(ym, rows), "apt-stamp")
    if changed:
        sm = os.path.join(HERE, "sitemap.xml")
        if os.path.exists(sm):
            t = open(sm, encoding="utf-8").read()
            t = re.sub(r"(<loc>https://hanzhinan.com/(jiaoyu|lvyou|zhufang)</loc><lastmod>)[0-9-]+", lambda m: m.group(1) + TODAY.isoformat(), t)
            open(sm, "w", encoding="utf-8").write(t)

if __name__ == "__main__":
    main()
