import { ReactNode} from 'react'

export const LockBody = ({children}: {children: ReactNode}) => (
    <>
    {children}
    <style jsx global>{`
        body {
            overflow: hidden;
        }
    `}
    </style>
</>
)