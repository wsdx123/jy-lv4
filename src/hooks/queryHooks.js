import { useMutation, useQueryClient } from 'react-query'

const useMutationHook = (func, name) => {
  const queryClient = useQueryClient()
  const mutation = useMutation(func, {
    onSuccess: () => {
      queryClient.invalidateQueries(name)
    }
  })
  return mutation
}

export { useMutationHook }
