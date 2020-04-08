import React, {Component} from 'react'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        // Обновляем состояние, чтобы следующее отображение
        // показало интерфейс на случай ошибок
        return { hasError: true };
    }
    componentDidCatch(error, info) {
        // Также можно залогировать ошибку
        console.log(error, info);
    }
    render() {
        if (this.state.hasError) {
            // Можно отобразить любой интерфейс на случай ошибок
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;