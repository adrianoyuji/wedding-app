import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../app/components/Layout";
import ConviteForm from "../../app/features/convite/ConviteForm";
import FailScreen from "../../app/features/convite/FailScreen";
import SuccessScreen from "../../app/features/convite/SuccessScreen";
import agent from "../../services/agent";

const Convite = () => {
  const router = useRouter();
  const { familyId } = router.query;
  const [family, setFamily] = useState(null);
  const [step, setStep] = useState("form");
  const [error, setError] = useState("");

  useEffect(() => {
    familyId && fetchFamily();
  }, [familyId]);

  const fetchFamily = async () => {
    try {
      const responseFamily = await agent.Families.get(familyId);
      console.log(responseFamily);
      setFamily(responseFamily.family);
      setError("");
    } catch (error) {
      setError("Familia não encontrada");
    }
  };

  if (!family && !error) {
    return <Layout direction={"column"}>Carregando...</Layout>;
  }

  const handleChangeStep = (page) => {
    setStep(page);
  };

  const steps = {
    form: () =>
      !!family && (
        <ConviteForm family={family} handleChangeStep={handleChangeStep} />
      ),
    success: () => <SuccessScreen />,
    fail: () => <FailScreen />,
  };

  return <Layout direction={"column"}>{steps[step]()}</Layout>;
};

export default Convite;
