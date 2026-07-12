from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

W, H = 1200, 630
NAVY = (11, 17, 32)
TEAL = (20, 184, 166)
MAROON = (122, 30, 44)
WHITE = (249, 250, 251)
MUTED = (168, 178, 194)

out = Path(r"c:\Users\evere\OneDrive\Documents\Home Project\Personal Website\website\assets\img\og-banner.png")

base = Image.new("RGB", (W, H), NAVY)
overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
od = ImageDraw.Draw(overlay)

grid = 48
for x in range(0, W + 1, grid):
    od.line([(x, 0), (x, H)], fill=(20, 184, 166, 24), width=1)
for y in range(0, H + 1, grid):
    od.line([(0, y), (W, y)], fill=(20, 184, 166, 24), width=1)

img = Image.alpha_composite(base.convert("RGBA"), overlay).convert("RGB")
draw = ImageDraw.Draw(img)


def load(cands, size):
    for p in cands:
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            continue
    return ImageFont.load_default()


font_mono = load(
    [r"C:\Windows\Fonts\consola.ttf", r"C:\Windows\Fonts\cour.ttf"],
    30,
)
font_name = load(
    [r"C:\Windows\Fonts\segoeuib.ttf", r"C:\Windows\Fonts\arialbd.ttf"],
    78,
)
font_sub = load(
    [r"C:\Windows\Fonts\segoeui.ttf", r"C:\Windows\Fonts\arial.ttf"],
    32,
)
font_url = load(
    [r"C:\Windows\Fonts\consola.ttf", r"C:\Windows\Fonts\cour.ttf"],
    24,
)


def center_text(text, font, y, fill):
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    x = (W - tw) // 2
    draw.text((x, y), text, font=font, fill=fill)


# Vertical centering of text block (~safe margins)
center_text("EW_", font_mono, 168, TEAL)
center_text("Everett Wong", font_name, 230, WHITE)

subtitle = "MMET Student at Texas A&M  |  Web Developer"
bbox = draw.textbbox((0, 0), subtitle, font=font_sub)
if bbox[2] - bbox[0] > W - 220:
    center_text("MMET Student at Texas A&M", font_sub, 340, TEAL)
    center_text("Web Developer", font_sub, 386, MUTED)
    center_text("everettwong618.github.io", font_url, 460, MUTED)
else:
    center_text(subtitle, font_sub, 348, TEAL)
    center_text("everettwong618.github.io", font_url, 420, MUTED)

img.save(out, "PNG", optimize=True)
print(f"saved {out} size={img.size} bytes={out.stat().st_size}")
