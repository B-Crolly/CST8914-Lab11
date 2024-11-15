// JavaScript code to make the accordion accessible using ARIA best practices

// Get all accordion trigger buttons from the DOM
const accordionTriggers = document.querySelectorAll('.accordion-trigger');

// For each trigger button, add event listeners for click and keydown events
accordionTriggers.forEach((trigger) => {
  
  // Click event listener to toggle the associated accordion panel
  trigger.addEventListener('click', (event) => {
    // Get the current value of 'aria-expanded' attribute
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    
    // Toggle the 'aria-expanded' attribute value
    trigger.setAttribute('aria-expanded', !expanded);
    
    // Get the ID of the associated accordion panel from 'aria-controls' attribute
    const panelId = trigger.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    
    // Toggle the 'hidden' attribute on the panel to show or hide it
    if (panel.hasAttribute('hidden')) {
      // If panel is hidden, remove the 'hidden' attribute to show it
      panel.removeAttribute('hidden');
    } else {
      // If panel is visible, add the 'hidden' attribute to hide it
      panel.setAttribute('hidden', '');
    }
  });
  
  // Keydown event listener to manage keyboard interactions
  trigger.addEventListener('keydown', (event) => {
    const key = event.key;
    let newTrigger;
    
    switch (key) {
      case 'ArrowDown':
      case 'Down': // For older browsers
        // Prevent default scrolling behavior
        event.preventDefault();
        // Move focus to the next accordion header button
        newTrigger = getNextTrigger(trigger);
        newTrigger.focus();
        break;
        
      case 'ArrowUp':
      case 'Up': // For older browsers
        event.preventDefault();
        // Move focus to the previous accordion header button
        newTrigger = getPreviousTrigger(trigger);
        newTrigger.focus();
        break;
        
      case 'Home':
        event.preventDefault();
        // Move focus to the first accordion header button
        accordionTriggers[0].focus();
        break;
        
      case 'End':
        event.preventDefault();
        // Move focus to the last accordion header button
        accordionTriggers[accordionTriggers.length - 1].focus();
        break;
        
      default:
        break;
    }
  });
});

// Function to get the next accordion trigger button
function getNextTrigger(currentTrigger) {
  // Find the index of the current trigger in the NodeList
  const index = Array.prototype.indexOf.call(accordionTriggers, currentTrigger);
  // Calculate the index of the next trigger, wrapping around if necessary
  const nextIndex = (index + 1) % accordionTriggers.length;
  // Return the next trigger button
  return accordionTriggers[nextIndex];
}

// Function to get the previous accordion trigger button
function getPreviousTrigger(currentTrigger) {
  // Find the index of the current trigger in the NodeList
  const index = Array.prototype.indexOf.call(accordionTriggers, currentTrigger);
  // Calculate the index of the previous trigger, wrapping around if necessary
  const prevIndex = (index - 1 + accordionTriggers.length) % accordionTriggers.length;
  // Return the previous trigger button
  return accordionTriggers[prevIndex];
}