const TOP = 'top'
const DEFAULT_TOP = 'User info'
const DEFAULT_BOTTOM = 'Approve operate'

export const getDefaultType = (level: string) => {
  return level === TOP ? DEFAULT_TOP : DEFAULT_BOTTOM
}
