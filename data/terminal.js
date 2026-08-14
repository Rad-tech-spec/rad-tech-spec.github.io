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
    { cmd: "cat stack.txt", out: "python · sql · docker · jenkins · ansible · postgresql" },
    { cmd: "echo $CLEARANCE", out: "gc reliability status — *active*" },
    { cmd: "echo $STATUS", out: "*open to work* /full time /Contract /permanent" },
    { cmd: "echo $LOCATION", out: "Toronto, ON"},
    { cmd: "echo $RELOCATE", out: "Open to relocated for US opportunities"}
  ],
};

export default terminal;
