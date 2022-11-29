import Head from "next/head";
import Footer from "../components/patials/footer";
import Header from "../components/patials/header";

export default function DefaultLayout({children,title}) {
    return (
        <div className="container">
            <Head>
                <title>{title}</title>
                <meta name="description" content="Chào mừng đến với thế giới thời trang dành cho cả nam và nữ" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}