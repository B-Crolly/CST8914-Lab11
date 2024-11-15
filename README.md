# README.md

# Accessible Accordion Component


## Questions Answered with Code Changes:

### 1. What is the keyboard interaction missing?

**a. Missing Keyboard Interaction for Enter and Spacebar Keys**

- **Issue**: The accordion trigger buttons do not respond to the **Enter** and **Spacebar** keys when they have focus. Users should be able to activate buttons using these keys.

- **Code Changes Made**:

  In the `accordion.js` file, we updated the `keydown` event listener to include cases for the Enter and Spacebar keys:

  ```javascript
  // Keydown event listener to manage keyboard interactions
  trigger.addEventListener('keydown', (event) => {
    const key = event.key;
    let newTrigger;

    switch (key) {
      // Existing cases for ArrowDown, ArrowUp, Home, End...

      case 'Enter':
      case ' ':
        event.preventDefault();
        // Simulate a click on the button to toggle the panel
        trigger.click();
        break;

      default:
        break;
    }
  });
  ```

**b. Lack of Visible Focus Indicator on Accordion Triggers**

- **Issue**: The CSS includes `outline: none;` on the accordion trigger buttons, removing the default focus indicator. This makes it difficult for keyboard users to see which element is currently focused.

- **Code Changes Made**:

  In the `accordion.css` file, we **removed** the `outline: none;` property from the `.accordion-trigger` class and **added** a custom focus style:

  ```css
  .accordion-trigger {
    /* Existing styles */
    /* Removed outline: none; */
  }

  .accordion-trigger:focus {
    outline: 2px solid #005fcc; /* Custom focus outline with sufficient contrast */
    outline-offset: 2px;
  }
  ```

---

### 2. What is the ARIA missing?

**Incorrect Use of `hidden` Attribute and Missing `aria-hidden`**

- **Issue**: The accordion panels use the `hidden` attribute to control visibility, which may not be correctly interpreted by assistive technologies. Also, `aria-hidden` is missing.

- **Code Changes Made**:

  In the `index.html` file, we **replaced** the `hidden` attribute with `aria-hidden="true"` on the accordion panels:

  ```html
  <!-- Accordion panel with ARIA attributes -->
  <div
    id="panel1id"
    class="accordion-content"
    role="region"
    aria-labelledby="accordion1id"
    aria-hidden="true"
  >
    <!-- Panel content -->
  </div>
  ```

  In the `accordion.js` file, we **updated** the click event listener to toggle the `aria-hidden` attribute on the panels:

  ```javascript
  // Click event listener to toggle the associated accordion panel
  trigger.addEventListener('click', (event) => {
    // Get the current value of 'aria-expanded' attribute
    const expanded = trigger.getAttribute('aria-expanded') === 'true';

    // Toggle the 'aria-expanded' attribute value
    trigger.setAttribute('aria-expanded', !expanded);

    // Get the ID of the associated accordion panel from 'aria-controls' attribute
    const panelId = trigger.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);

    // Toggle the 'aria-hidden' attribute on the panel
    if (expanded) {
      panel.setAttribute('aria-hidden', 'true');
    } else {
      panel.setAttribute('aria-hidden', 'false');
    }
  });
  ```

  In the `accordion.css` file, we **adjusted** the display of panels based on the `aria-hidden` attribute:

  ```css
  /* Show panel when aria-hidden is false */
  .accordion-content[aria-hidden="false"] {
    display: block;
  }

  /* Hide panel when aria-hidden is true */
  .accordion-content[aria-hidden="true"] {
    display: none;
  }
  ```

---

### Summary of Changes Made

- **Keyboard Interaction**:

  - **Added** handling for **Enter** and **Spacebar** keys in the `keydown` event listener to allow activation of the accordion triggers.
  - **Restored** the focus indicator by removing `outline: none;` and **added** a custom focus style for better visibility.

- **ARIA Attributes**:

  - **Replaced** the `hidden` attribute with `aria-hidden` on the accordion panels to improve compatibility with assistive technologies.
  - **Ensured** that the `aria-expanded` attribute on the trigger buttons is updated when panels are toggled.

---

