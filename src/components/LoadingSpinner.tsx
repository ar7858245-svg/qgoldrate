const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 rounded-full border-4 border-muted animate-pulse" />
        {/* Spinning gold ring */}
        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-primary animate-spin" />
        {/* Inner glow */}
        <div className="absolute inset-2 w-12 h-12 rounded-full bg-primary/10 animate-pulse" />
      </div>
      <p className="text-muted-foreground text-sm animate-pulse">
        Fetching latest gold prices...
      </p>
    </div>
  );
};

export default LoadingSpinner;
