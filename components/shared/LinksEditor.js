// import React from 'react';
// import parse from 'html-react-parser';

// const LinkEditor = ({ setFieldTouched, setFieldValue, field, touched }) => {

//   invalid = touched && touched[field] && 800;
//   return (
//     <>
//       <Toggler
//         color="light"
//         backgroundColor="thatBlue"
//         label={displayPreview ? 'Edit' : 'Preview'}
//         onClick={() => {
//           setDisplayPreview(!displayPreview);
//           setTouched(fieldName, true);
//         }}
//         width="15rem"
//       />
//       {!displayPreview && (
//         <>
//           <TextArea
//             value={markdown}
//             onChange={handleMarkdownChange}
//             name={field}
//             id={field}
//             className={invalid ? 'invalid' : ''}
//           />
//           <MarkdownNote>*Markdown supported</MarkdownNote>
//         </>
//       )}
//       {displayPreview && <Preview>{parse(converter.render(markdown))}</Preview>}
//     </>
//   );
// };

// export default MarkdownEditor;
