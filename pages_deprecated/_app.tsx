import wrapper from '../src/store'
import {Provider} from 'react-redux'
import '../styles/globals.scss'
import type {ReactElement, ReactNode} from 'react'
import type {NextPage} from 'next'
import type {AppProps} from 'next/app'
import Layout from '@/composition/layout/Layout'


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & { getLayout?: (page: ReactElement) => ReactNode }

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout }

function MyApp({Component, pageProps}: AppPropsWithLayout) {
    const {store, props} = wrapper.useWrappedStore(pageProps)
    const getLayouts = Component.getLayout ?? Layout


    return <Provider store={store}>
    </Provider>
}

export default MyApp