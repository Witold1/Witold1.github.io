## 📄 Description
<!-- Provide a short description of the brand you're adding or the changes you're making. Include context about why this is a valuable addition. -->

---

## ✅ Contribution Checklist
Please confirm that you've met the following criteria before submitting your contribution:

- [ ] **Widespread Recognition:** The brand has widespread recognition and is suitable for the core LittleLink repository (most additions belong in [LittleLink Extended](https://github.com/sethcottle/littlelink-extended)).  
- [ ] **Brand Styling Guidelines:** You’ve followed the brand's official styling guidelines (if available).  
- [ ] **Consistent Styling:** If no guidelines exist, the button style is consistent with the brand's public image (e.g., website, social media).  
- [ ] **Icon Clarity:** The brand's logo/icon is clear and recognizable in a 24x24px format.  
   - [ ] If the primary logo doesn’t scale well, you’ve adapted it using the brand’s social media avatar or favicon while maintaining the essence of the original logo.  
   - [ ] The icon is provided in `.svg` format.  
- [ ] **Theme Testing:** You've tested the button against both light and dark themes:  
   - [ ] Manually switched the `<html>` class in `index.html` between `theme-light` and `theme-dark` to check contrast or used [LittleLink Button Builder](https://builder.littlelink.io) contrast checker.
   - [ ] Added a `#000000`/`#FFFFFF` stroke if necessary to improve contrast and accessibility. [LittleLink Button Builder](https://builder.littlelink.io) will automatically recommend when to add a stroke.  
- [ ] **Accessibility Compliance:** The button's background and text colors meet visual accessibility standards (unless it contradicts brand guidelines).  
- [ ] **Alphabetical Order:** Your contribution is alphabetically organized in `brands.css` and `index.html`.  
- [ ] **Button Preview:** You've added a button preview in `index.html`.  
- [ ] **Variant Naming Schema:** If adding a variant button (e.g., inverted color scheme):  
   - [ ] Naming follows the existing pattern (`[Brand Name] Alt` and `.button-brandname-alt`).  
   - [ ] Any additional icons are named according to `brandname-alt.svg` schema.  
- [ ] **Proper Capitalization:**  
   - [ ] In `brands.css`, the brand name comment follows `/* Brand Name */` format.  
   - [ ] Code uses lowercase for `.button.button-brandname`.  
   - [ ] In `index.html`, comments reflect `<!-- Brand Name -->` format.  
   - [ ] Button text and `alt` attributes match the brand’s official capitalization.  
- [ ] **PR Details:**  
   - [ ] Included a brief description of the brand addition.
   - [ ] Included a screenshot of the new button(s).  
   - [ ] Provided relevant information on the brand’s global/regional reach or usage stats.  
   - [ ] Bumped VERSION.md / Major.Minor.Patch (you'll likely want to bump minor if you're just adding a new brand or making a small tweak)

---

## 📸 Screenshot  
<!-- Attach a screenshot of the new button(s) to ensure consistency and clarity. -->

---

## 🚀 Additional Notes  
<!-- Add any other information that might help the reviewer understand the changes better (e.g., source of logo, special handling, etc.). -->
