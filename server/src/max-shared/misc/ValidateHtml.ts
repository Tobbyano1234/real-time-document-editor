// import { JSDOM } from 'jsdom';

// const validateHtml = (html:string) => {
//     try {
//         const dom = new JSDOM(html);
//         const document = dom.window.document;
//         const errors = [];

//         // Check for invalid HTML elements
//         const invalidElements = document.querySelectorAll('invalid');
//         if (invalidElements.length > 0) {
//             errors.push('Invalid HTML elements found');
//         }

//         // Check for invalid HTML attributes
//         const invalidAttributes = document.querySelectorAll('[invalid-attribute]');
//         if (invalidAttributes.length > 0) {
//             errors.push('Invalid HTML attributes found');
//         }

//         if (errors.length > 0) {
//             return { error: errors.join(', ') };
//         }

//         return { valid: true };
//     } catch (error) {
//         return { error: 'Invalid HTML' };
//     }
// };

// export default validateHtml;