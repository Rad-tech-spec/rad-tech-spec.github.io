/**
 * Content for the hero terminal.
 *
 * Each entry is one command and the output printed under it.
 * Wrap part of an `out` string in *asterisks* to emphasise it (same convention
 * as the intro tagline). Add, remove, or reorder freely — the component just
 * plays whatever is in this list.
 *
 * Keep this complementary to the rest of the hero: the job title lives on the
 * profile card and the positioning line is the tagline, so repeating either
 * here just makes the section say the same thing three times.
 */
const terminal = {
  title: "~/rad — zsh",
  lines: [
    { cmd: "cat tech.txt", out: "python · sql · docker · ci/cd · ai/rag" },
    { cmd: "cat people.txt", out: "sales · customer service · *exceeded targets*" },
    { cmd: "echo $CLEARANCE", out: "gc reliability status — *active*" },
    { cmd: "echo $STATUS", out: "*open to work* /full time /Contract /permanent" },
    { cmd: "echo $LOCATION", out: "Greater Toronto Area, Canada"},
    { cmd: "echo $RELOCATE", out: "Open to relocated for US opportunities (tn eligible)"}
  ],
};

export default terminal;
