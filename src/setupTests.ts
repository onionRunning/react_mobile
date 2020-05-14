import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const sessionStorageMock = () => {
  let store: any = {}
  return {
    getItem: (key: string) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      return store[key] || null
    },
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    clear: () => {
      store = {}
    },
  }
}

global.sessionStorage = sessionStorageMock() as Storage
