export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-gray-300 border-t-primary-500"></div>
    </div>
  );
}
