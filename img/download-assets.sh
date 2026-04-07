#!/bin/bash
# ============================================================
#  Download Figma assets for CPZP_landing_mobile_app
#  Run this script from the project root:  bash img/download-assets.sh
#
#  NOTE: These URLs expire ~7 days after generation.
#  Re-run get_design_context in Figma MCP to refresh them.
# ============================================================

cd "$(dirname "$0")"

echo "Downloading ČPZP landing page assets..."

curl -L "https://www.figma.com/api/mcp/asset/44dc09f8-8f7c-46dd-9422-f27c94727597" -o logo_cpzp.png
curl -L "https://www.figma.com/api/mcp/asset/4cfac524-83a9-45da-bd7a-a767e98c861d" -o logo_cpzp_footer.png
curl -L "https://www.figma.com/api/mcp/asset/05fda684-872b-4dc6-8eee-0cdf4105c68c" -o hero_bg.jpg
curl -L "https://www.figma.com/api/mcp/asset/ffcbfa7f-8a0d-45b5-a8f4-f818556d253a" -o section_pojistenci.jpg
curl -L "https://www.figma.com/api/mcp/asset/a904eac8-c9f4-47d3-b89d-52e563b214cb" -o section_tehotne.jpg
curl -L "https://www.figma.com/api/mcp/asset/cdc47a51-9da9-4231-a0f4-5df1d4579ecd" -o section_deti.jpg
curl -L "https://www.figma.com/api/mcp/asset/0e9770b6-7725-4c56-9307-2703b6116c31" -o section_verejnost.jpg
curl -L "https://www.figma.com/api/mcp/asset/5b848497-e436-4062-9ba7-0ce9b1fd25e7" -o icon_android.png
curl -L "https://www.figma.com/api/mcp/asset/85eb985e-6076-4aab-9f4a-438ccba6a8de" -o icon_ios.png
curl -L "https://www.figma.com/api/mcp/asset/893c936e-23b7-4cc7-a4d3-1495edcff2fd" -o nav_home.png
curl -L "https://www.figma.com/api/mcp/asset/53f3da74-5fb9-4f37-be31-394948a6199a" -o nav_pojistenci.png
curl -L "https://www.figma.com/api/mcp/asset/825e4c7e-ff85-4e5d-a5d6-ecf8267d1be7" -o nav_verejnost.png
curl -L "https://www.figma.com/api/mcp/asset/10d23993-24ee-49d3-bf9a-8c14f0ecab04" -o nav_tehotne.png
curl -L "https://www.figma.com/api/mcp/asset/6c6f5a8e-cb08-4975-8614-eee45218592d" -o nav_dite.png
curl -L "https://www.figma.com/api/mcp/asset/f6f97426-1fa2-45a6-886b-0a49c0dd31e5" -o ellipse_deco.png
curl -L "https://www.figma.com/api/mcp/asset/9c3d244d-e26a-4a9c-a166-d3581205e92e" -o vector91.png
curl -L "https://www.figma.com/api/mcp/asset/832976c0-e5aa-451e-a9bb-e4fc2ffae5ad" -o vector90.png
curl -L "https://www.figma.com/api/mcp/asset/873f3dcb-bbe1-4599-b1b6-3929e6b0b9af" -o vector89.png

echo "Done. Check img/ folder for downloaded files."
