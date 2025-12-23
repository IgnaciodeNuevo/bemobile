import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const AllProviders = ({ children }: { children: React.ReactNode }) => <>{children}</>

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => ({
  user: userEvent.setup(),
  ...render(ui, { wrapper: AllProviders, ...options }),
})

export * from '@testing-library/react'
export { customRender as render }
