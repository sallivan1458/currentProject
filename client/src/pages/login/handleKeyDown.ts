// export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
//     switch (e.key) {
//         case "ArrowDown":
//             e.preventDefault();
//             const nextDown = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement | null;
//             nextDown && nextDown.focus();
//             break;
//         case "ArrowUp":
//             e.preventDefault();
//             const nextUp = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement | null;
//             nextUp && nextUp.focus();
//             break;
//     }
// }