import {
  Blockquote,
  Code,
  Link,
  Quote,
  Text,
} from "@/registry/default/ui/typography";

export default function Particle() {
  return (
    <div className="flex max-w-prose flex-col gap-3">
      <Blockquote>
        Design is not just what it looks like and feels like. Design is how it
        works.
      </Blockquote>
      <Text>
        As the saying goes, <Quote>less is more</Quote> when it comes to
        interface design.
      </Text>
      <Text>
        Install the package with <Code>npm install @tinji/typography</Code> to
        get started.
      </Text>
      <Text>
        Read more in the{" "}
        <Link href="https://base-ui.com">Base UI documentation</Link>.
      </Text>
    </div>
  );
}
