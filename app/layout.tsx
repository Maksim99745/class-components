import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="App">{children}</div>
      </body>
    </html>
  );
}

// 'use client';

// import { ReactNode } from 'react';
// import { Provider } from 'react-redux';
// import store from 'store/store';
// import styles from '../components/core/themes/Theme.module.scss';
// import { useTheme } from '../components/core/themes/themeHooks';
// import { ThemeProvider } from '../components/core/themes/ThemeProvider';

// export default function RootLadyout({ children }: { children: ReactNode }) {
//   const isDarkTheme = useTheme();
//   return (
//     <Provider store={store}>
//       <ThemeProvider>
//         <html lang="en">
//           <body suppressHydrationWarning>
//             <div className={isDarkTheme ? styles.darkTheme : undefined} data-testid="theme-container">
//               <div className="App">
//                 <main>{children}</main>
//               </div>
//             </div>
//           </body>
//         </html>
//       </ThemeProvider>
//     </Provider>
//   );
// }
