# 시험 실행 로봇 (2026-10-27) — 게시판 주소와 글 모양만 확인해서 probe_result.txt 로 남김.
# 사이트 페이지는 하나도 바꾸지 않음. GitHub Actions 「probe」에서 「Run workflow」로 한 번 실행.
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
def anchors(page):
    for m in re.finditer(r'<a\b[^>]*href="([^"#]+)"[^>]*>(.*?)</a>', page, re.S):
        yield m.group(1), txt(m.group(2))

# ---------- 1. 한울타리 ----------
MC = "https://mcfamily.or.kr"
log("=" * 70); log("1. 한울타리", MC)
u, st, page = get(MC + "/")
log("home:", st, "bytes", len(page))
boards = {}
for href, t in anchors(page):
    m = re.match(r"(?:https?://mcfamily\.or\.kr)?(/posts/[a-z_-]+)/?(?:\?.*)?$", href)
    if m and t: boards.setdefault(m.group(1), t)
    if any(k in t for k in ("가족센터", "지역사회", "카드", "공지", "서울의 정보", "프로그램")) and len(t) < 20:
        log("  menu:", repr(t), "->", href)
log("posts boards:", boards)
for path in sorted(boards):
    u, st, p = get(f"{MC}{path}?page=1")
    items = [(h, t) for h, t in anchors(p) if re.match(rf"{re.escape(path)}/\d+", h.replace(MC, ""))]
    log("-" * 60); log("board", path, repr(boards[path]), "status", st, "items", len(items))
    for h, t in items[:4]:
        i = p.find(h)
        log("   item:", repr(t[:80]), "| around:", txt(p[i:i + 700])[:260])
    time.sleep(0.5)

# ---------- 2. 다누리 ----------
DN = "https://www.liveinkorea.kr"
log("=" * 70); log("2. 다누리", DN)
u, st, page = get(DN + "/")
log("home:", st, u, "bytes", len(page))
found = {}
KEYS = ("기관소식", "타기관", "참고자료", "프로그램", "행사", "채용", "가족센터정보", "알림")
for href, t in anchors(page):
    if any(k in t for k in KEYS) and len(t) < 25 and "/bbs/" in href:
        full = urllib.parse.urljoin(u, href)
        found.setdefault(full, t)
for full, t in found.items(): log("  link:", repr(t), "->", full)
seenbase = set()
for full, t in list(found.items())[:12]:
    base = re.sub(r"/(list|view)\.do.*$", "", full.split("?")[0])
    if base in seenbase: continue
    seenbase.add(base)
    u2, st2, p = get(base + "/list.do?cpage=1")
    chunks = re.split(r"<dl[\s>]|<tr[\s>]|<li class=\"[^\"]*item", p)[1:]
    arts = re.findall(r"article_seq=(\d+)", p)
    log("-" * 60); log("board", repr(t), base, "status", st2, "article links", len(arts))
    n = 0
    for c in chunks:
        if "article_seq=" not in c: continue
        log("   row:", txt(c[:900])[:280]); n += 1
        if n >= 4: break
    time.sleep(0.5)

# ---------- 3. 서울시 뉴스 ----------
NS = "https://news.seoul.go.kr/welfare/archives/category/woman-news_c1/foreigner_multiculture_business_c1/news_foreigner_multiculture-news-n1"
log("=" * 70); log("3. 서울시 뉴스", NS)
u, st, p = get(NS)
arts = []
for h, t in anchors(p):
    if re.search(r"/welfare/archives/\d+", h) and t and t not in arts: arts.append(t)
log("status", st, "bytes", len(p), "articles", len(arts))
for t in arts[:5]: log("   title:", t[:90])

KST = datetime.timezone(datetime.timedelta(hours=9))
OUT.insert(0, f"probe run {datetime.datetime.now(KST):%Y-%m-%d %H:%M} KST")
open("probe_result.txt", "w", encoding="utf-8").write("\n".join(OUT) + "\n")
print("\n".join(OUT))
