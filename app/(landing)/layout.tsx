const LandingLayout = ({
    children
}: {
        children: React.ReactNode;
}) => {
    return (
      <main className="h-full bg-gradient-to-b from-gray-900 to-gray-500  overflow-auto">
        <div className="mx-auto max-w-screen-xl h-full w-full">{children}</div>
      </main>
    );
}
 
export default LandingLayout;