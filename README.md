## English Version

![sample](https://raw.githubusercontent.com/zelda0079/Steam-Curator-Game-Manager/refs/heads/main/sample.png)

[My Curator](https://store.steampowered.com/curator/33923354)

### Overview


This Tampermonkey userscript enhances the Steam Curator admin interface for the "Accepted" games page. It adds checkboxes to each game block, allowing you to mark and filter games you wish to hide (e.g., games you don't want to review or games that were reviewed but had their review deleted due to Steam's 2000-review limit for curators). The script provides toggles to show/hide checked or unchecked games, filters by review status (reviewed/unreviewed), and supports importing/exporting checkbox states for backup and sharing. Additionally, it includes multi-language support for English, Traditional Chinese, and Simplified Chinese.


### Features


- **Checkboxes for Games**: Automatically adds a checkbox to each game block on the "Accepted" page. Check a box to mark a game as "hidden" (to be filtered out).
- **Visibility Toggles**:

Show All Games
Show Hidden Games (checked)
Show Unhidden Games (unchecked)
- **Review Status Filters**:

Show Reviewed & Unreviewed
Show Reviewed Only
Show Unreviewed Only
- **Bulk Actions**: Select All or Deselect All visible games.
- **Import/Export**: Export checkbox states to a JSON file for backup; import from a JSON file to restore states.
- **Language Switching**: Toggle between English, Traditional Chinese (zh-TW), and Simplified Chinese (zh-CN). The selected language is saved locally.
- **Auto-Save**: Checkbox states are automatically saved to localStorage and persist across sessions.

### Installation


1. Install the [Tampermonkey](https://www.tampermonkey.net/) browser extension (supports Chrome, Firefox, Edge, etc.).
2. Go to [https://github.com/zelda0079/Steam-Curator-Game-Manager/raw/refs/heads/main/Steam_Curator_Game_Manager.user.js](https://github.com/zelda0079/Steam-Curator-Game-Manager/raw/refs/heads/main/Steam_Curator_Game_Manager.user.js) and install it.
3. Navigate to your Steam Curator admin page: [https://store.steampowered.com/curator/YOUR_ID/admin/accepted](https://store.steampowered.com/curator/*/admin/accepted).
4. The script will automatically load and add controls at the top of the page.

**Note**: The script only activates on the /admin/accepted page. It hides the default Steam filter and adds custom controls.


### Usage


1. **Mark Games**: Click the checkbox next to a game to mark it as hidden (checked = hidden).
2. **Filter Views**:

- Use the "Toggle" dropdown to show all, hidden, or unhidden games.
- Use the "Review" dropdown to filter by reviewed/unreviewed status.
3. **Bulk Select**: Use "Select All" or "Deselect All" to toggle checkboxes on all currently visible games.
4. **Backup States**:

- Click "Export" to download a steam_curator_checkboxes.json file.
- Click "Import", select a JSON file, and it will update the checkboxes and apply filters.
5. **Language Switch**: Use the language dropdown to change the interface language (updates immediately).

The filters apply dynamically and save your preferences locally. Hidden games help manage your curator queue, especially with the 2000-review limit—hide reviewed games whose reviews were auto-deleted to avoid re-reviewing.


### Supported Languages


- English (en)
- Traditional Chinese (zh-TW)
- Simplified Chinese (zh-CN)

### Troubleshooting


- If controls don't appear, refresh the page or ensure you're on the /admin/accepted URL.
- Checkbox states are tied to app IDs; importing from another curator may not match perfectly.
- The script uses localStorage; clear it if issues arise (via browser dev tools).

### Authors


- Original: zelda
- Enhanced: Grok3 & Gemini 2.5 Pro

### License


This script is provided as-is under the MIT License. Feel free to modify and share.

## 中文版本

[我的鑑賞家](https://store.steampowered.com/curator/33923354)

### 概述


這個 Tampermonkey 使用者腳本增強了 Steam 鑑賞家（Curator）管理介面的「已接收」遊戲頁面。它為每個遊戲區塊添加勾選框，讓您標記並過濾不想評測的遊戲（例如，不想評測的遊戲，或已評測但因 Steam 鑑賞家評價上限 2000 個而被刪除評價的遊戲）。腳本提供顯示/隱藏勾選遊戲的切換、依評測狀態過濾（已評測/未評測），並支援匯入/匯出勾選狀態以備份和分享。此外，它包含多語言支援，包括英文、繁體中文和簡體中文。


### 功能


- **遊戲勾選框**：在「已接收」頁面的每個遊戲區塊自動添加勾選框。勾選表示將遊戲標記為「隱藏」（用於過濾）。
- **顯示切換**：

顯示所有遊戲
顯示隱藏遊戲（已勾選）
顯示未隱藏遊戲（未勾選）
- **評測狀態過濾**：

顯示已評測與未評測
僅顯示已評測
僅顯示未評測
- **批次動作**：全選或取消全選目前可見遊戲。
- **匯入/匯出**：匯出勾選狀態至 JSON 檔案以備份；從 JSON 檔案匯入以還原狀態。
- **語言切換**：在英文、繁體中文 (zh-TW) 和簡體中文 (zh-CN) 之間切換。選取語言會本地儲存。
- **自動儲存**：勾選狀態自動儲存至 localStorage，並在會話間持續存在。

### 安裝


1. 安裝 [Tampermonkey](https://www.tampermonkey.net/) 瀏覽器擴充套件（支援 Chrome、Firefox、Edge 等）。
2. 去 [https://github.com/zelda0079/Steam-Curator-Game-Manager/raw/refs/heads/main/Steam_Curator_Game_Manager.user.js](https://github.com/zelda0079/Steam-Curator-Game-Manager/raw/refs/heads/main/Steam_Curator_Game_Manager.user.js) 並安裝。
5. 前往您的 Steam 鑑賞家管理頁面：[https://store.steampowered.com/curator/YOUR_ID/admin/accepted](https://store.steampowered.com/curator/*/admin/accepted)。
6. 腳本會自動載入並在頁面頂端添加控制項。

**注意**：腳本僅在 /admin/accepted 頁面啟動。它會隱藏 Steam 預設過濾器並添加自訂控制項。


### 使用說明


1. **標記遊戲**：點擊遊戲旁的勾選框以標記為隱藏（勾選 = 隱藏）。
2. **過濾檢視**：

- 使用「切換」下拉選單顯示所有、隱藏或未隱藏遊戲。
- 使用「評測」下拉選單依已評測/未評測狀態過濾。
3. **批次勾選**：使用「全選」或「取消全選」來切換目前可見遊戲的勾選框。
4. **備份狀態**：

- 點擊「匯出」以下載 steam_curator_checkboxes.json 檔案。
- 點擊「匯入」，選取 JSON 檔案，它會更新勾選框並套用過濾。
5. **語言切換**：使用語言下拉選單變更介面語言（立即更新）。

過濾會動態套用並本地儲存您的偏好。隱藏遊戲有助於管理鑑賞家佇列，特別是面對 2000 個評價上限時——隱藏已評測但評價被自動刪除的遊戲，以避免重複評測。


### 支援語言


- 英文 (en)
- 繁體中文 (zh-TW)
- 簡體中文 (zh-CN)

### 疑難排解


- 如果控制項未出現，請重新整理頁面或確認 URL 為 /admin/accepted。
- 勾選狀態依 App ID 綁定；從其他鑑賞家匯入可能無法完美匹配。
- 腳本使用 localStorage；若有問題，可透過瀏覽器開發工具清除。

### 作者


- 原作：zelda
- 增強：Grok3 & Gemini 2.5 Pro

### 授權


此腳本依 MIT 授權提供。歡迎修改與分享。
