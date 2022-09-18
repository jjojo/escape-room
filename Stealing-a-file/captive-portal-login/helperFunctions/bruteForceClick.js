const input = document.getElementById("code");
const submitButton = document.getElementById("submitBtn");
const suggestions = [
  "test",
  "ased",
  "HJ2K",
  "hjss",
  "asd",
  "123",
  "hjss",
  "asd",
  "123",
];

suggestions.some((code) => {
  input.value = code;
  submitButton.click();
});
