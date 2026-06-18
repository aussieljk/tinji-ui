import { Em, Heading, Strong, Text } from "@/registry/default/ui/typography";

export default function Particle() {
  return (
    <div className="flex max-w-prose flex-col gap-3">
      <Heading level={1} size="xl">
        The quick brown fox
      </Heading>
      <Text color="muted">
        A versatile set of typographic primitives for headings, body text, and
        inline emphasis.
      </Text>
      <Text>
        Use <Strong>Strong</Strong> for important content and <Em>Em</Em> for
        subtle emphasis within a paragraph of text.
      </Text>
    </div>
  );
}
