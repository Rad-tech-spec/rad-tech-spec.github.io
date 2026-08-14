/**
 * Contact details for the "Let's talk" card.
 *
 * Values are base64 so they never appear as plain text in the HTML or the JS
 * bundle. Harvesters overwhelmingly regex raw source for `mailto:` and address
 * patterns, and this defeats that.
 *
 * Be clear-eyed about what this is: DETERRENCE, NOT SECURITY. Anyone who opens
 * devtools and runs atob() on these gets the value. Client-side code cannot
 * keep a secret from the client. Real protection needs a server that only
 * releases the details after verifying a token — see the Cloudflare Pages
 * Functions route discussed with Rad.
 *
 * To change a value, base64-encode it:
 *   node -e "console.log(Buffer.from('you@example.com').toString('base64'))"
 */
const contact = {
  entries: [
    {
      id: "email",
      label: "Email",
      // Eshghirad97@gmail.com
      value: "RXNoZ2hpcmFkOTdAZ21haWwuY29t",
      href: (v) => `mailto:${v}`,
      enabled: true,
    },
    {
      id: "phone",
      label: "Phone",
      value: "KzEgKDY0NykgNjQ4LTgzNTI=",
      href: (v) => `tel:${v.replace(/[^\d+]/g, "")}`,
      // Published at Rad's request. Set to false to pull it back off the site —
      // though note that anything already scraped can't be recalled.
      enabled: true,
    },
  ],
};

export default contact;
