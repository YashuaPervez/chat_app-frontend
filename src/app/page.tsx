// Components
import FormSwitcher from "./FormSwitcher";
import Paper from "./components/Paper";

const Home = () => {
  return (
    <div className="w-full max-w-2xl">
      <Paper>
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-3xl mb-4">Chatting App</h1>
          <FormSwitcher />
        </div>
      </Paper>
    </div>
  );
};

export default Home;
