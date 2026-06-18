/**
 * ACCESSIBILITY (axe) EXAMPLE — NOT RUN BY DEFAULT
 * ------------------------------------------------
 * This file intentionally does NOT match the test glob (no `.test.` in the
 * name), so `bun test` ignores it. It documents how to add real axe-powered
 * accessibility assertions once a DOM environment + axe are installed.
 *
 * The existing suite runs components as pure functions (no DOM, no renderer),
 * which is enough to assert the accessibility-relevant *output* (roles,
 * aria-* attributes, labels) — see the structural a11y assertions already
 * present in the component .test.tsx files (e.g. role="group" on DateField,
 * aria-current on TabsNavLink, aria-pressed on FilterChip, aria-label on the
 * chart track/segments and lightbox controls).
 *
 * To run axe against actually-rendered DOM you need:
 *
 *   1. A DOM environment for bun:
 *        bun add -d @happy-dom/global-registrator
 *      then create a preload that registers it, and point bunfig.toml at it:
 *        # bunfig.toml
 *        [test]
 *        preload = ["./packages/ui/test/setup.ts"]
 *        # ./packages/ui/test/setup.ts
 *        import { GlobalRegistrator } from "@happy-dom/global-registrator";
 *        GlobalRegistrator.register();
 *
 *   2. A React renderer + Testing Library:
 *        bun add -d @testing-library/react react-dom
 *
 *   3. axe + the jest-compatible matcher:
 *        bun add -d axe-core jest-axe @types/jest-axe
 *      (vitest-axe also works, but jest-axe matches bun:test's jest-style
 *       expect more directly.)
 *
 * Then a real a11y test (renamed to `a11y.test.tsx`) would look like:
 *
 *   import { afterEach, expect, test } from "bun:test";
 *   import { cleanup, render } from "@testing-library/react";
 *   import { axe, toHaveNoViolations } from "jest-axe";
 *   import { DateField } from "../../src/components/date-field";
 *
 *   expect.extend(toHaveNoViolations);
 *   afterEach(cleanup);
 *
 *   test("DateField has no accessibility violations", async () => {
 *     const { container } = render(<DateField aria-label="Birth date" />);
 *     expect(await axe(container)).toHaveNoViolations();
 *   });
 *
 * Repeat per component (Card, Badge, Tabs, CreditCard, etc.). Wrapping each
 * component in its required context/provider (e.g. RadioButtonGroupItem inside
 * RadioButtonGroup, chart segments inside StackedHorizontalBarChart) is
 * required for valid markup before running axe.
 */

export {};
