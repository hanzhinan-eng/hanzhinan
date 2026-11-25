# 시험 실행 로봇 3차 (2026-11-25) — 한울타리 종료(2026-12-31) 대비.
# 새 두 사이트(마이서울플러스 · 패밀리서울)의 게시판을 로봇이 읽을 수 있는지만 확인해서 probe_result.txt 로 남김.
# 사이트 페이지는 하나도 바꾸지 않음. GitHub Actions 「probe 시험 실행」에서 「Run workflow」로 한 번 실행.
# 확인할 것: ① 마이서울플러스 서울시 소식(9)·센터소식(12)·프로그램 신청  ② 패밀리서울 교육·문화 프로그램, 행사
#           ③ 한울타리 지금 글과 제목이 얼마나 겹치는지 (빠지는 글이 있는지)
import re, html, urllib.request, urllib.parse, datetime, time

UA = {"User-Agent": "Mozilla/5.0 (hanzhinan-bot; +https://hanzhinan.com)", "Accept-Language": "ko"}
OUT = []
def log(*a): OUT.append(" ".join(str(x) for x in a))
def req(url, data=None):
    body = urllib.parse.urlencode(data).encode() if data else None
    h = dict(UA)
    if data: h.update({"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", "X-Requested-With": "XMLHttpRequest"})
    try:
        with urllib.request.urlopen(urllib.request.Request(url, data=body, headers=h), timeout=60) as r:
            return r.geturl(), r.status, r.read().decode("utf-8", "replace")
    except Exception as e:
        return url, f"ERR {e}", ""
def txt(h): return html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", h or "", flags=re.S)))).strip()
def norm(t): return re.sub(r"[^0-9A-Za-z가-힣]", "", t)[:25]

TITLES = {}   # 출처 이름 -> [제목]

# ---------- 1. 마이서울플러스 (global.seoul.go.kr) ----------
log("=" * 70); log("1. 마이서울플러스 global.seoul.go.kr")
G = "https://global.seoul.go.kr"
def g_board(name, base, bbs):
    log("-" * 60); log(name, base, "bbs_no", bbs)
    # 채용공고(bbs 8)에서 이미 쓰는 방식 그대로: 목록은 bordContListPgng.do 에 POST
    u, st, p = req(G + base + "/bordContListPgng.do", {"bbs_no": str(bbs), "miv_pageNo": "1", "miv_pageSize": "40"})
    log("  POST Pgng status", st, "bytes", len(p))
    rows = []
    for tr in re.findall(r"<tr[^>]*>(.*?)</tr>", p, re.S):
        m = re.search(r"contDetail\('([0-9A-Fa-f]+)'\)[^>]*>(.*?)</a>", tr, re.S)
        d = re.search(r"(20\d\d)[-.](\d\d)[-.](\d\d)", txt(tr))
        if m: rows.append((m.group(1), txt(m.group(2)), "-".join(d.groups()) if d else "?"))
    log("  rows parsed:", len(rows))
    for i, t, d in rows[:12]: log("   ", d, repr(t[:80]), "id", i[:20])
    TITLES[name] = [t for i, t, d in rows]
    if not rows:
        log("  (못 읽음) snippet:", txt(p)[:500])
        log("  raw head:", repr(p[:700]))
        u2, st2, p2 = req(G + base + f"/bordContListPage.do?bbs_no={bbs}")
        log("  GET Page status", st2, "bytes", len(p2))
        for m in sorted(set(re.findall(r"[\"']([^\"']*\.do)[\"']", p2)))[:30]: log("    .do:", m)
    elif rows:
        i = rows[0][0]
        u3, st3, p3 = req(G + base + f"/bordContDetail.do?mode=W&bbs_no={bbs}&pst_no={i}")
        log("  detail status", st3, "bytes", len(p3), "title in page:", rows[0][1][:15] in txt(p3))
    time.sleep(0.5)
g_board("서울시 소식", "/hmpg/sinf/snew/snot", 9)
g_board("센터소식", "/hmpg/sinf/cnew/cnot", 12)

log("-" * 60); log("프로그램 신청 /hmpg/ecpr/prgm")
u, st, p = req(G + "/hmpg/ecpr/prgm/prgmListPage.do")
log("  GET Page status", st, "bytes", len(p))
dos = sorted(set(re.findall(r"[\"']([^\"']*\.do)[\"']", p)))
for m in dos[:40]: log("    .do:", m)
for fn in sorted(set(re.findall(r"onclick=\"([A-Za-z_]+)\(", p)))[:20]: log("    onclick fn:", fn)
for cand in [x for x in dos if "Pgng" in x or "List" in x][:4]:
    full = urllib.parse.urljoin(G + "/hmpg/ecpr/prgm/", cand)
    u, st, q = req(full, {"miv_pageNo": "1", "miv_pageSize": "20"})
    log("  POST", full, "status", st, "bytes", len(q))
    log("     text:", txt(q)[:500])
    log("     raw:", repr(q[:500]))
    time.sleep(0.5)

# ---------- 2. 패밀리서울 (familyseoul.or.kr) ----------
log("=" * 70); log("2. 패밀리서울 familyseoul.or.kr")
F = "https://familyseoul.or.kr"
def f_list(name, path):
    log("-" * 60); log(name, F + path)
    u, st, p = req(F + path)
    log("  status", st, "->", u, "bytes", len(p))
    seen = []
    for m in re.finditer(r'<a\b[^>]*href="((?:https://familyseoul\.or\.kr)?/node/(\d+))"[^>]*>(.*?)</a>', p, re.S):
        t = txt(m.group(3))
        if len(t) >= 8 and m.group(2) not in [s[0] for s in seen]: seen.append((m.group(2), t, m.start()))
    log("  node links:", len(seen))
    for nid, t, pos in seen[:10]:
        log("   ", nid, repr(t[:80]))
    if seen:
        nid, t, pos = seen[0]
        log("  around first (text):", txt(p[max(0, pos - 900):pos + 900])[:500])
        log("  around first (raw):", repr(p[max(0, pos - 700):pos + 500]))
    else:
        log("  snippet:", txt(p)[:500])
    for k in ("모집중", "모집완료", "접수중", "다문화", "로딩중", "views-row", "pager", "?page="):
        c = p.count(k)
        if c: log(f"   page has {k!r} x{c}")
    TITLES[name] = [t for nid, t, pos in seen]
    time.sleep(0.5)
    return p
f_list("교육프로그램", "/family-service/all-class-front")
f_list("교육프로그램 2쪽", "/family-service/all-class-front?page=1")
f_list("교육프로그램(all-class)", "/all-class")
f_list("문화프로그램", "/family-service/culture-class")
f_list("자치구별 프로그램", "/family-service/consultation-program")
f_list("행사 및 이벤트", "/events")
f_list("공지사항", "/notice")
f_list("다문화 안내(중국어)", "/mcfamily?lang=zh-hans")

# ---------- 3. 한울타리 지금 글과 비교 ----------
log("=" * 70); log("3. 한울타리 mcfamily.or.kr 와 제목 겹침")
MC = "https://mcfamily.or.kr"
new_all = {norm(t) for k, v in TITLES.items() for t in v}
def mc_titles(path, rx):
    u, st, p = req(MC + path)
    out = []
    for m in re.finditer(rx, p, re.S):
        t = txt(m.group(1))
        if len(t) >= 8 and t not in out: out.append(t)
    log("-" * 60); log(path, "status", st, "bytes", len(p), "titles", len(out))
    hit = 0
    for t in out[:16]:
        ok = norm(re.sub(r"^\[[^\]]*\]\s*", "", t)) in {norm(re.sub(r"^\[[^\]]*\]\s*", "", x)) for k, v in TITLES.items() for x in v} or norm(t) in new_all
        hit += ok
        log("   ", "O" if ok else "X", repr(t[:80]))
    log(f"  => 새 사이트에도 있는 글 {hit} / {min(len(out), 16)}")
    time.sleep(0.5)
for b in ("notice", "info", "family"):
    mc_titles(f"/posts/{b}", r'<a\b[^>]*href="/posts/(?:info|notice|family)/\d+[^"]*"[^>]*>(.*?)</a>')
mc_titles("/programs/family", r'text-grey800 mb-2">[^<]*</span><span[^>]*>(.*?)</span>')

KST = datetime.timezone(datetime.timedelta(hours=9))
OUT.insert(0, f"probe-3 run {datetime.datetime.now(KST):%Y-%m-%d %H:%M} KST")
open("probe_result.txt", "w", encoding="utf-8").write("\n".join(OUT) + "\n")
print("\n".join(OUT))
