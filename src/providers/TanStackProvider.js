'use client'

import { useState } from "react"

const { QueryClientProvider, QueryClient } = require("@tanstack/react-query")
const { ReactQueryDevtools } = require("@tanstack/react-query-devtools")

const TanStackProvider = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient())
    return <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
}

export default TanStackProvider;