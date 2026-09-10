const fs = require("fs");
const files = [
  "components/registration/StepReview.tsx",
  "components/registration/StepParticipantData.tsx",
  "components/registration/RegistrationFlow.tsx",
  "app/actions/registrationActions.ts"
];

files.forEach(file => {
  let content = fs.readFileSync(file, "utf8");
  let updated = content;
  
  updated = updated.replace(/eventSlug === ['"]turnamen-futsal-slta['"]/g, "eventSlug.startsWith('turnamen-futsal')");
  updated = updated.replace(/draft\.eventSlug === ['"]turnamen-futsal-slta['"]/g, "draft.eventSlug.startsWith('turnamen-futsal')");
  updated = updated.replace(/draft\.eventSlug !== ['"]turnamen-futsal-slta['"]/g, "!draft.eventSlug.startsWith('turnamen-futsal')");

  if (content !== updated) {
    fs.writeFileSync(file, updated, "utf8");
    console.log("Updated " + file);
  }
});
