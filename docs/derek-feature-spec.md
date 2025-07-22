# derek-feature-spec.md

## 🧠 Feature Name: Test Your Derek Knowledge

Add an interactive and humorous Easter egg to the Valheim server website, allowing users to guess “Derek’s favorite animal” based on a visual clue. This module is fully self-contained and does not interfere with core functionality.

---

## 🎯 Goal

- Enhance engagement with a fun personality test tied to the server password hint.
- Use the Derek PNG artifact (transparent background) as an animated visual gag.
- Reward correct answers with positive feedback; respond to wrong guesses with humor.

---

## 🧩 Component Summary

- **Component**: `DerekKnowledgeTest`
- **Location**: Modular, plug-in section below server details or password hint
- **Asset**: `/assets/derek.png` (transparent background)

---

## 🖱️ User Flow

1. User sees a button labeled:  
   **“Test Your Derek Knowledge 🧠”**
2. On click, a password field, submit button, and Derek image appear.
3. User enters a guess and clicks **Submit**.
4. Derek responds after a 0.5s delay:
   - If correct:  
     “You really know me, bro.”  
   - If incorrect: Randomized message from:
     - “That’s not my spirit animal, man.”
     - “Try again, amateur.”
     - “C’mon, I wore that shirt *every day*.”
     - If they answer variations of cat: “You think I’d pick a cat? Bro.”
5. Derek pulses visually; speech bubble appears with styled border.

---

## ✅ Success Criteria

- [ ] Clicking the “Test Your Derek Knowledge 🧠” button toggles the form open.
- [ ] User input is case-insensitive and trimmed.
- [ ] Correct answer triggers a positive message:  
  > *“You really know me, bro.”*
- [ ] Incorrect answers trigger randomized humorous responses.
- [ ] Derek image appears with subtle rune-pulse animation.
- [ ] Speech bubble has glowing rune border or jagged comic style.
- [ ] Response appears after a 0.5 second delay.
- [ ] Input field shakes on incorrect answer.
- [ ] Button slightly wiggles on hover.
- [ ] Component is modular, scoped, and does not affect global site behavior.
- [ ] Fully responsive and visually coherent with site aesthetic.

---

## 🔒 Answer

- Correct answer: `dragon`  
- Case-insensitive, whitespace-trimmed

---

## 🧪 Test Scenarios

| Scenario                     | Input      | Expected Result                             |
|-----------------------------|------------|---------------------------------------------|
| Correct answer              | dragon     | Derek praises the user                      |
| Incorrect answer            | cat        | Random failure message                      |
| Incorrect with whitespace   |  dragon  \ | Not expected as correct answer. Tell them that the format contains spaces             |
| Repeated wrong answers      | sloth      | New random message each time                |
| Mobile view                 | Any        | Layout remains readable and functional      |
| No JavaScript               | Any        | Graceful no-op (non-critical feature)       |

---

## 📁 Asset

- `assets/derek.png` — Transparent image of Derek’s face and shirt
