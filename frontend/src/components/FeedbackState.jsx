export default function FeedbackState({ type = 'loading', title, message, onRetry }) {
  return (
    <div className={`feedback-state ${type}`} role={type === 'error' ? 'alert' : 'status'}>
      <span>{type === 'loading' ? '•••' : type === 'error' ? '!' : 'Rx'}</span>
      <h2>{title}</h2>
      <p>{message}</p>
      {onRetry && <button className="secondary-button" onClick={onRetry} type="button">Try again</button>}
    </div>
  );
}

