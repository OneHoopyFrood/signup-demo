# Signup form demo (for TST)

Quick demo of a sign up form page.

## The Brief

Create a simple sign up form using ReactJS. No backend is required.
The form should accept a username, a password, and a password confirmation
field. Persist and validate the inputs, particularly that the password and
confirmation match. Inform the user of the error state or acceptance of their
entries.

- DON'T OVER-ENGINEER THIS. Simplicity is appreciated at TST.
- Style the form for bonus points
- React is preferred (particularly with hooks), but you are free to use
  vanillaJS if you prefer.

## Considerations:

- State management
  - I'm told this is important to TST, but they have explicitly called out
    over-engineering as a problem they're looking out for.
  - I could use `useReducer` but that conflicts that goal. So, I think I'll stick
    to a more simplistic method of state management in the form component itself.
- Tooling:
  - I _could_ make a flat file here, but to properly support JSX, which is the
    primary method of use for React, I will go ahead and introduce some minima
    build environment. This feels like potential overkill, but I hope you will
    understand the decision here. I will leverage Parcel for this because it's
    zero-config and very quick to set up, keeping things minimal.
  - Since I'm introducing a build tool, I might as well go ahead and use
    TypeScript. It's not any more complex, and it enhances IDE experience.
  - To make running as simple and fast as possible for the evaluator, I'll use
    yarn@4 through corepack to enable PnP.
  - \*\*While these decisions will result in a larger package size, potentially
    causing the evaluator to question whether this is over-engineered, in
    reality they are all simple tools used to accelerate the process while still
    producing a beautiful, functional result. (Please don't penalize me 😅)
- Code design
  - I want to keep this as light as possible, but maintain some organization to
    demonstrate that I understand how to do that. I'll use multiple components
    for this purpose.
  - I'll use tailwind-css for speed and convenience
- UX:
  - I could encrypt the password, but I'll avoid it on the KISS principle.
  - I will avoid displaying errors before the form is fully filled out. I find the
    practice of some websites to display error messaging while you are still
    entering information to be irritating. To accomplish that I'll add a small
    debounce as well as avoiding messaging at all until the user blurs out of the
    final input.
