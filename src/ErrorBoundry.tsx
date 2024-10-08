import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode; // Define children prop
}

interface ErrorBoundaryState {
    hasError: boolean; // Define state type
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false }; // Initialize state
    }

    static getDerivedStateFromError() {
        return { hasError: true }; // Update state when an error occurs
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
        // You can also send the error to a logging service here.
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>; // Fallback UI
        }

        return this.props.children; // Render children if no error
    }
}

export default ErrorBoundary;
