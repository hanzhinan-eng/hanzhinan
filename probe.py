# 시험 실행 로봇 2차 (2026-10-28) — 게시판 주소와 글 모양만 확인해서 probe_result.txt 로 남김.
# 사이트 페이지는 하나도 바꾸지 않음. GitHub Actions 「probe 시험 실행」에서 「Run workflow」로 한 번 실행.
# 확인할 것: ① 서울시 「행사 및 축제」·「참여 신청」·「문화참여 달력」 주소와 글 모양  ② 다누리 알림공간·프로그램 게시판 주소
import re, html, urllib.request, urllib.parse, datetime, time

UA = {"User-Agent": "Mozilla/5.0 (hanzhinan-bot; +https://hanzhinan.com)", "Accept-Language": "ko"}
OUT = []
def log(*a): OUT.append(" ".join(str(x) for x in a))
def get(url):
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
            return r.geturl(), r.status, r.read().decode("utf-8", "replace")
    except Exception as e:
        return url, f"ERR {e}", ""
def txt(h): return html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", h or ""))).strip()
def anchors(page, base):
    for m in re.finditer(r'<a\b[^>]*href="([^"#]+)"[^>]*>(.*?)</a>', page, re.S):
        yield urllib.parse.urljoin(base, html.unescape(m.group(1))), txt(m.group(2))
def show_list(url, label, n=6):
    u, st, p = get(url)
    log("-" * 60); log(label, url, "->", u, "status", st, "bytes", len(p))
    if not p: return
    # 글처럼 보이는 링크: 제목이 10자 이상
    seen = 0
    for href, t in anchors(p, u):
        if len(t) >= 10 and any(k in href for k in ("view", "detail", "seq", "Sn=", "idx", "/archives/")):
            i = p.find(href.split("/")[-1][:30])
            log("   item:", repr(t[:90]), "->", href[:160])
            if i >= 0: log("        around:", txt(p[i:i + 600])[:240])
            seen += 1
            if seen >= n: break
    if not seen:
        i = p.find("<tbody"); i = i if i >= 0 else p.find("list")
        log("   (글 링크 못 찾음) snippet:", txt(p[max(0, i):i + 1500])[:600])
    for k in ("ajax", ".json", "getList", "selectList", "fn_", "goView", "onclick"):
        c = p.count(k)
        if c: log(f"   page uses {k!r} x{c}")

# ---------- 1. 서울시 새소식 ----------
log("=" * 70); log("1. 서울시 seoul.go.kr 새소식")
SEOUL = "https://www.seoul.go.kr/realmnews/in/list.do"
u, st, page = get(SEOUL)
log("start:", st, u, "bytes", len(page))
menu = {}
for href, t in anchors(page, u):
    if any(k in t for k in ("행사", "축제", "참여", "문화참여", "달력", "분야별")) and len(t) < 20:
        menu.setdefault(t, href)
for t, href in menu.items(): log("  menu:", repr(t), "->", href)
for t, href in list(menu.items())[:6]:
    show_list(href, t)
    time.sleep(0.5)

# ---------- 2. 다누리 (첫 화면이 intro.do 로 넘어가므로 메인과 채용 게시판에서 메뉴를 찾음) ----------
log("=" * 70); log("2. 다누리 liveinkorea.kr")
DN = "https://www.liveinkorea.kr"
pages = [DN + "/web/main/index.do", DN + "/web/lay1/bbs/S1T10C29/A/6/list.do"]
found = {}
for start in pages:
    u, st, p = get(start)
    log("start:", start, "->", u, st, "bytes", len(p))
    for href, t in anchors(p, u):
        if "/bbs/" in href and t and len(t) < 25:
            base = re.sub(r"/(list|view)\.do.*$", "", href.split("?")[0])
            found.setdefault(base, t)
for base, t in found.items(): log("  board:", repr(t), "->", base)
for base, t in found.items():
    if any(k in t for k in ("기관", "타기관", "참고", "프로그램", "행사", "알림", "공지")):
        show_list(base + "/list.do", "다누리 " + t, n=4)
        time.sleep(0.5)

KST = datetime.timezone(datetime.timedelta(hours=9))
OUT.insert(0, f"probe-2 run {datetime.datetime.now(KST):%Y-%m-%d %H:%M} KST")
open("probe_result.txt", "w", encoding="utf-8").write("\n".join(OUT) + "\n")
print("\n".join(OUT))
