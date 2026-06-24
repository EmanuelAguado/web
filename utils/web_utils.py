import json
import re
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).parent.parent

OUTPUT_DIR = ROOT / "static" / "icons"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

STACKS = {
    "dcc": [

        {
            "name": "Maya",
            "logo": "https://cdn.simpleicons.org/autodesk"
        },

        {
            "name": "Arnold",
            "logo": "https://cdn.simpleicons.org/autodesk"
        },

        {
            "name": "Redshift",
            "logo": "https://www.maxon.net/favicon.ico"
        },

        {
            "name": "V-Ray",
            "logo": "https://www.chaos.com/favicon.ico"
        },

        {
            "name": "3ds Max",
            "logo": "https://cdn.simpleicons.org/autodesk"
        },

        {
            "name": "ZBrush",
            "logo": "https://pixologic.com/favicon.ico"
        },

        {
            "name": "Substance Painter",
            "logo": "https://cdn.simpleicons.org/adobe"
        },

        {
            "name": "Substance Designer",
            "logo": "https://cdn.simpleicons.org/adobe"
        },

        {
            "name": "Marvelous Designer",
            "logo": "https://www.marvelousdesigner.com/favicon.ico"
        },

        {
            "name": "After Effects",
            "logo": "https://cdn.simpleicons.org/adobeaftereffects"
        },

        {
            "name": "Nuke",
            "logo": "https://www.foundry.com/favicon.ico"
        },

        {
            "name": "Premiere Pro",
            "logo": "https://cdn.simpleicons.org/adobepremierepro"
        },

        {
            "name": "Photoshop",
            "logo": "https://cdn.simpleicons.org/adobephotoshop"
        },

        {
            "name": "Marmoset Toolbag",
            "logo": "https://marmoset.co/wp-content/uploads/2016/11/cropped-marmoset512-32x32.png"
        },

        {
            "name": "RV",
            "logo": "https://cdn.simpleicons.org/autodesk"
        },

        {
            "name": "Deadline",
            "logo": "https://cdn.simpleicons.org/amazonaws"
        },

        {
            "name": "Arnold",
            "logo": "https://cdn.simpleicons.org/autodesk"
        },

        {
            "name": "Redshift",
            "logo": "https://www.maxon.net/favicon.ico"
        }

    ],

    "development": [

        {
            "name": "Python",
            "logo": "https://cdn.simpleicons.org/python"
        },

        {
            "name": "PySide",
            "logo": "https://cdn.simpleicons.org/qt"
        },

        {
            "name": "Flask",
            "logo": "https://cdn.simpleicons.org/flask"
        },

        {
            "name": "FastAPI",
            "logo": "https://cdn.simpleicons.org/fastapi"
        },

        {
            "name": "Supabase",
            "logo": "https://cdn.simpleicons.org/supabase"
        },

        {
            "name": "PostgreSQL",
            "logo": "https://cdn.simpleicons.org/postgresql"
        },

        {
            "name": "Flow Production Tracking",
            "logo": "https://cdn.simpleicons.org/autodesk"
        },

        
        {
            "name": "Git",
            "logo": "https://cdn.simpleicons.org/git"
        },

        {
            "name": "GitHub",
            "logo": "https://cdn.simpleicons.org/github"
        },

        {
            "name": "Docker",
            "logo": "https://cdn.simpleicons.org/docker"
        },
        {
            "name": "FFmpeg",
            "logo": "https://cdn.simpleicons.org/ffmpeg"
        },
        {
            "name": "Sphinx",
            "logo": "https://www.sphinx-doc.org/en/master/_static/sphinx-logo.svg"
        },
        {
            "name": "Mkdocs",
            "logo": "https://www.mkdocs.org/img/favicon.ico"
        },
        {
            "name": "VS Code",
            "logo": "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/visualstudiocode.svg"
        },

        {
            "name": "Inno Setup",
            "logo": "https://jrsoftware.org/favicon.ico"
        },

        {
            "name": "Maya API",
            "logo": "https://cdn.simpleicons.org/autodesk"
        },

        {
            "name": "AYON (R&D)",
            "logo": "https://docs.ayon.dev/img/favicon.ico"
        },
    
        {
            "name": "Kitsu (R&D)",
            "logo": "https://www.cg-wire.com/favicon.png"
        },

        {
            "name": "USD (R&D)",
            "logo": "https://openusd.org/images/USDLogo24.svg"
        }

    ]
}


def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r"\(.*?\)", "", text)
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def get_extension(content_type: str, url: str) -> str:
    content_type = content_type.lower()

    if "svg" in content_type:
        return ".svg"
    if "png" in content_type:
        return ".png"
    if "jpeg" in content_type or "jpg" in content_type:
        return ".jpg"
    if "icon" in content_type:
        return ".ico"

    return Path(url).suffix or ".bin"


for category in STACKS.values():
    for item in category:
        url = item["logo"]

        if not url.startswith("http"):
            continue

        request = Request(
            url,
            headers={"User-Agent": "Mozilla/5.0"},
        )

        try:
            print(f"Downloading: {url}")
            with urlopen(request, timeout=20) as response:
                content = response.read()
                content_type = response.headers.get(
                    "Content-Type",
                    "",
                )
        except Exception as exc:
            print(f"FAILED: {url}")
            print(exc)
            continue

        extension = get_extension(content_type, url)
        filename = f"{slugify(item['name'])}{extension}"
        output_path = OUTPUT_DIR / filename

        with open(output_path, "wb") as f:
            f.write(content)

        item["logo"] = f"./static/icons/{filename}"


print("\n\nUPDATED JSON:\n")

print(
    json.dumps(
        STACKS,
        indent=4,
        ensure_ascii=False,
    )
)

# with open(ROOT / "stacks_local.json", "w", encoding="utf-8") as f:
#     json.dump(
#         STACKS,
#         f,
#         indent=4,
#         ensure_ascii=False,
#     )