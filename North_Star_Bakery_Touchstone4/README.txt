North Star Bakery — Touchstone 4

SETUP IN YOUR EXISTING CODESPACE
1. Upload and extract North_Star_Bakery_Touchstone4.zip in your repository.
2. In the terminal, change into the extracted North_Star_Bakery_Touchstone4 folder.
3. Run: python3 -m http.server 8000
4. Leave the terminal running. In Ports, open port 8000 in the browser.
   Stop any older server with Ctrl+C before starting this one.
5. In Source Control, commit and sync the new folder so the repository includes
   script.js, all four HTML pages, styles.css, and media. A running preview alone
   does not update the GitHub repository.
6. Check the repository link in a private browser window while signed out.
   Repository: https://github.com/richcruz121-ctrl/sophia_webdev-t2-html-project

THREE REQUIRED SCREENSHOTS
Use sample contact information only.
1. Products: scroll to Save something for later. Select Country sourdough and
   Chocolate chip cookie. Capture the selected buttons, favorites list and count.
2. Contact: enter Sample Student for Name, not-an-email for Email, select General
   question, and type Hi in Item details. Submit the practice request. Capture
   the email and details errors together, with the entered text still visible.
3. Return to Products and refresh. Capture the two restored favorites and the
   message Your saved favorites have been restored. Alternatively capture the
   Contact page's Remembered favorites message and prefilled details after using
   Use saved favorites. Upload the three images to complete the Word template.

FINAL BROWSER CHECKS
- Toggle each favorite on and off; clear the list; refresh to confirm clearing.
- Save two favorites, open Contact, click Use saved favorites. Existing details
  should be kept and favorites appended. Choose a pickup date for a preorder.
- Enter Sample Student, sample@example.com, General question, and a question
  longer than 10 characters. Submit. Expect the practice validation confirmation.
- Empty required fields and submit. Correct errors; verify text remains intact.
- Try a narrow mobile window and a desktop window, all navigation, images,
  and the About page audio. Check the browser console for JavaScript errors.
- Recheck the final public repository and insert your screenshots in the template.

IMPLEMENTATION
script.js uses a products array and a favorites array, modular functions,
inline JavaScript validation, and localStorage key northStar.favorites.v1.
Favorites persist in this browser and can prefill the request form. Contact
information and allergy notes are not stored. Storage errors are handled.
This is a demonstration: no request, order, email or payment is sent.

VERIFICATION ALREADY PERFORMED
Node DOM simulation covered toggles, reload data, prefill, invalid and valid
requests, input retention, minimum length, clearing, malformed/blocked storage,
and the limit when appending favorites. Local relative assets were checked.
Actual browser appearance, screenshots, console and public hosting still need
verification in the Codespace. No browser screenshot is included as evidence yet.
