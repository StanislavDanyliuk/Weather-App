import { AlertTriangle, MapPin } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Button } from './ui/button'

type ErrorAlertProps = {
  title: string
  description?: string
  onRetry?: () => void
  btnTitle?: string
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title,
  description,
  onRetry,
  btnTitle,
}) => {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>{description}</p>
      </AlertDescription>
      {btnTitle && onRetry && (
        <Button
          onClick={onRetry}
          variant={'outline'}
          size={'icon'}
          className="w-fit p-2"
        >
          <MapPin className="mr-2 h-2 w-4" />
          {btnTitle}
        </Button>
      )}
    </Alert>
  )
}
export default ErrorAlert
