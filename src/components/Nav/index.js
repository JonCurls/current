nav {
    background: var(--color-primary);
    width: max-content;
    display: block;
    padding: 0.7rem 1.7rem;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 2rem;
    display: flex;
    gap: 0.8rem;
    border-radius: 3rem;
    backdrop-filter: blur(15px);
}

nav a {
    background: transparent;
    padding: 0.9rem;
    border-radius: 50%;
    display: flex;
    color: var(--color-light);
    font-size: 1.1rem;
}
nav a:hover{
    background: rgba(0, 0, 0, 0.2);
}
nav a.active{
    background: var(--color-primary-variant);
    color: var(--color-white);
}