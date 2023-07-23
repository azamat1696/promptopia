import '@styles/globals.css'
import Nav from "@components/Nav";
import Profile from "@components/Profile";
import Provider from "@components/Provider";

//metadata
export const metadata = {
    title: 'Promptopia',
    description: 'Discover the best prompts for your next writing session.',
    keywords: 'Layout'
}
const RootLayout = ({children}) => {
    return (
        <html lang="en">
             <body  suppressHydrationWarning={true}>
             <Provider>
                 <div className="main">
                     <div className="gradient" />
                 </div>
                 <main className="app">
                     <Nav />
                     {children}
                 </main>
             </Provider>
             </body>
        </html>
    )
}
export default RootLayout
