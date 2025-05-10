// Import dependencies
const say = require("say");

// Use default system voice and speed
// say.speak("Hello tanu, what are you doing. Where is you brother Kitu");

// // Set the speed
say.speak("Hello tanu, what are you doing. Where is you brother Kitu", "0.75");

// Stop the text currently being spoken
// say.stop();

// Export Voice to file
// const filename = "hello.wav";
// say.export(
//   "Hello tanu, what are you doing. Where is you brother Kitu",
//   "",
//   1,
//   filename,
//   function (err) {
//     if (err) {
//       return console.error(err);
//     }

//     console.log(`Text has been saved to ${filename}`);
//   }
// );
