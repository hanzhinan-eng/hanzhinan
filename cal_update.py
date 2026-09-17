#!/usr/bin/env python3
# 청약日历 자동 갱신 — 청약홈 공공 API(data.go.kr 15098547) → zhufang.html 카드 교체
# 실행: APPLYHOME_KEY=발급키 python3 cal_update.py   (--sample: 키 없이 견본 데이터로 테스트)
import os, sys, json, re, datetime, urllib.request, urllib.parse

API = "https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancDetail"
REGIONS = {"서울": "首尔", "경기": "京畿", "인천": "仁川"}
KST = datetime.timezone(datetime.timedelta(hours=9))
TODAY = datetime.datetime.now(KST).date()
HTML = os.path.join(os.path.dirname(os.path.abspath(__file__)), "zhufang.html")

def fetch(key):
    since = (TODAY - datetime.timedelta(days=60)).isoformat()
    rows, page = [], 1
    while True:
        q = {"page": page, "perPage": 100, "serviceKey": key, "cond[RCRIT_PBLANC_DE::GTE]": since}
        url = API + "?" + urllib.parse.urlencode(q)
        with urllib.request.urlopen(url, timeout=30) as r:
            j = json.load(r)
        rows += j.get("data", [])
        if page * 100 >= j.get("totalCount", 0) or not j.get("data"):
            break
        page += 1
    return rows

def sample():
    return [
        {"HOUSE_NM": "더샵 분당하이스트", "HSSPLY_ADRES": "경기도 성남시 분당구 …", "SUBSCRPT_AREA_CODE_NM": "경기",
         "HOUSE_SECD_NM": "APT", "HOUSE_DTL_SECD_NM": "민영", "SPSPLY_RCEPT_BGNDE": "2026-09-18", "SPSPLY_RCEPT_ENDDE": "2026-09-18",
         "RCEPT_BGNDE": "2026-09-18", "RCEPT_ENDDE": "2026-09-28", "GNRL_RNK1_CRSPAREA_RCPTDE": "2026-09-21", "GNRL_RNK2_CRSPAREA_RCPTDE": "2026-09-28",
         "PRZWNER_PRESNATN_DE": "2026-10-02", "TOT_SUPLY_HSHLDCO": 800, "PBLANC_URL": "https://www.applyhome.co.kr/ai/aia/selectAPTLttotPblancDetail.do?houseManageNo=2026000001&pblancNo=2026000001"},
        {"HOUSE_NM": "인천계양지구 A6블록 공공분양주택", "HSSPLY_ADRES": "인천광역시 계양구 …", "SUBSCRPT_AREA_CODE_NM": "인천",
         "HOUSE_SECD_NM": "APT", "HOUSE_DTL_SECD_NM": "국민", "SPSPLY_RCEPT_BGNDE": "2026-09-17", "SPSPLY_RCEPT_ENDDE": "2026-09-17",
         "RCEPT_BGNDE": "2026-09-17", "RCEPT_ENDDE": "2026-10-02", "GNRL_RNK1_CRSPAREA_RCPTDE": "2026-09-22", "GNRL_RNK2_CRSPAREA_RCPTDE": "2026-10-02",
         "PRZWNER_PRESNATN_DE": "2026-10-21", "TOT_SUPLY_HSHLDCO": 1200, "PBLANC_URL": "https://www.applyhome.co.kr/"},
    ]

def d(s):
    try: return datetime.date.fromisoformat(str(s)[:10])
    except Exception: return None
def md(s):
    x = d(s); return f"{x.month}.{x.day}" if x else "—"

def esc(t): return str(t).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def card(r):
    reg = r.get("SUBSCRPT_AREA_CODE_NM", "")
    adr = r.get("HSSPLY_ADRES", "") or ""
    city = ""
    m = re.search(r"\S+?(시|군|구)\b", adr.split(" ", 1)[1] if " " in adr else adr)
    if m: city = m.group(0)
    kind = r.get("HOUSE_DTL_SECD_NM") or r.get("HOUSE_SECD_NM") or ""
    kind_zh = "公共分양" if kind in ("국민", "공공") else "民营"
    sp_b, sp_e = d(r.get("SPSPLY_RCEPT_BGNDE")), d(r.get("SPSPLY_RCEPT_ENDDE"))
    g1, g2, ge = d(r.get("GNRL_RNK1_CRSPAREA_RCPTDE")), d(r.get("GNRL_RNK2_CRSPAREA_RCPTDE")), d(r.get("RCEPT_ENDDE"))
    win = d(r.get("PRZWNER_PRESNATN_DE"))
    if sp_b and sp_e:
        sp = f"{md(sp_b)}" + (f"～{md(sp_e)}" if sp_e != sp_b else "")
        if sp_e < TODAY: sp += " 已截止"
        elif sp_b <= TODAY <= sp_e: sp = "<strong>今天可报 " + sp + "</strong>"
    else:
        sp = "无（看公告）"
    gen = f"{md(g1)}～{md(g2 or ge)}" if g1 else f"～{md(ge)}"
    if ge and ge < TODAY: gen += " 已截止"
    if sp_b and TODAY < sp_b: top, tag = f"特供 {md(sp_b)} 开始", "ok"
    elif sp_e and TODAY <= sp_e: top, tag = "特供进行中", "ok"
    elif ge and TODAY <= ge: top, tag = f"1·2 顺位 {gen}", "info"
    else: top, tag = f"接收已结束 · 发榜 {md(win)}", "off"
    url = r.get("PBLANC_URL") or "https://www.applyhome.co.kr/ai/aia/selectAPTLttotPblancListView.do"
    tot = r.get("TOT_SUPLY_HSHLDCO")
    tot_s = f" · {tot} 户" if tot else ""
    return f'''    <article class="ntc">
      <div class="ntc-top"><span class="tag {tag}">{REGIONS.get(reg, esc(reg))} {esc(city)} · {kind_zh}{tot_s}</span></div>
      <h3>{esc(r.get("HOUSE_NM",""))}</h3>
      <p class="ntc-sum">{top}</p>
      <dl class="kv">
        <dt>特别供给</dt><dd>{sp}</dd>
        <dt>1·2 顺位</dt><dd>{gen}</dd>
        <dt>发榜</dt><dd>{md(win)} · <a href="{esc(url)}" target="_blank" rel="noopener">公告原文</a></dd>
      </dl>
    </article>
'''

def build(rows):
    keep = []
    for r in rows:
        if r.get("SUBSCRPT_AREA_CODE_NM") not in REGIONS: continue
        win = d(r.get("PRZWNER_PRESNATN_DE"))
        if not win or win < TODAY: continue           # 발표 지난 것 제외
        sp_b = d(r.get("SPSPLY_RCEPT_BGNDE")) or d(r.get("RCEPT_BGNDE"))
        if sp_b and sp_b > TODAY + datetime.timedelta(days=21): continue  # 3주 이후 시작은 다음 주에
        keep.append(r)
    keep.sort(key=lambda r: (d(r.get("SPSPLY_RCEPT_BGNDE")) or d(r.get("RCEPT_BGNDE")) or TODAY, r.get("HOUSE_NM","")))
    if not keep:
        return '    <p class="note">这两周首尔·京畿·仁川没有正在接收的新楼盘。下周一自动更新。</p>\n'
    return "".join(card(r) for r in keep)

def main():
    use_sample = "--sample" in sys.argv
    key = os.environ.get("APPLYHOME_KEY", "")
    if not use_sample and not key:
        sys.exit("APPLYHOME_KEY 환경변수가 없습니다 (테스트는 --sample)")
    rows = sample() if use_sample else fetch(key)
    body = build(rows)
    html = open(HTML, encoding="utf-8").read()
    new = re.sub(r"(<!-- CAL:START -->\n).*?(<!-- CAL:END -->)", lambda m: m.group(1) + body + m.group(2), html, flags=re.S)
    stamp = f"청약홈 {TODAY.year}.{TODAY.month}.{TODAY.day} 自动更新"
    new = re.sub(r'(<span class="today-day" id="cal-stamp">).*?(</span>)', lambda m: m.group(1) + stamp + m.group(2), new)
    if new != html:
        open(HTML, "w", encoding="utf-8").write(new)
        sm = os.path.join(os.path.dirname(HTML), "sitemap.xml")
        if os.path.exists(sm):
            t = open(sm, encoding="utf-8").read()
            t = re.sub(r"(<loc>https://hanzhinan.com/zhufang</loc><lastmod>)[0-9-]+", lambda m: m.group(1) + TODAY.isoformat(), t)
            open(sm, "w", encoding="utf-8").write(t)
        print(f"updated: {len(rows)} rows fetched, cards written")
    else:
        print("no change")

if __name__ == "__main__":
    main()
