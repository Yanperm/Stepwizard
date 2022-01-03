import React, { useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import { MdDescription } from "react-icons/md";
import StepWizard from "react-step-wizard";
import { Row, Col, Button, FormGroup, Label, Input } from "reactstrap";

const ActionButtons = (props) => {
  const handleBack = () => {
    props.previousStep();
  };

  const handleNext = () => {
    props.nextStep();
  };

  const handleFinish = () => {
    props.lastStep();
  };

  return (
    <div>
      <Row>
        {props.currentStep > 1 && (
          <Col>
            <Button onClick={handleBack}>กลับ</Button>
          </Col>
        )}
        <Col>
          {props.currentStep < props.totalSteps && (
            <Button onClick={handleNext}>ถัดไป</Button>
          )}
          {props.currentStep === props.totalSteps && (
            <Button onClick={handleFinish}>เสร็จสิ้น</Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

const One = (props) => {
  const [info1, setInfo1] = useState({});
  const [error, setError] = useState("");

  const onInputChanged = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    setInfo1((info1) => ({
      ...info1,
      [targetName]: targetValue
    }));
  };

  const validate = () => {
    if (!info1.name) setError("Name is mandatory field");
    else {
      setError("");
      props.nextStep();
      props.userCallback(info1);
    }
  };

  return (
    <div>
      <span style={{ color: "red" }}>{error}</span>
      <h1>กรุณาป้อนข้อมูลของท่าน</h1>
      <FormGroup>
        <Label>ชื่อโครงการ: </Label>
        <Input
          type="text"
          name="name"
          placeholder="ชื่อโครงการสำหรับจัดแฟ้ม"
          onChange={onInputChanged}
        />
      </FormGroup>
      <br />
      <ActionButtons {...props} nextStep={validate} />
    </div>
  );
};

const Two = (props) => {
  const [info2, setInfo2] = useState({});
  const [error, setError] = useState("");

  const onInputChanged = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    setInfo2((info2) => ({
      ...info2,
      [targetName]: targetValue
    }));
  };

  const validate2 = () => {
    if (!info2.age) setError("Age is mandatory field");
    else {
      setError("");
      props.nextStep();
      props.userCallback(info2);
    }
  };

  return (
    <div>
      <span style={{ color: "red" }}>{error}</span>
      <h1>จำนวนแปลงที่ดิน</h1>
      <FormGroup>
        <Label>
          ยินดีต้อนรับโครงการ <b>{props.user.name || ""}</b>
        </Label>
      </FormGroup>
      <FormGroup>
        <Label>แปลงที่ดิน: </Label>
        <Input
          type="text"
          name="age"
          placeholder="จำนวนแปลงที่ดิน"
          onChange={onInputChanged}
        />
      </FormGroup>
      <br />
      <ActionButtons {...props} nextStep={validate2} />
    </div>
  );
};

const Three = (props) => {
  console.log("step3 receive user object");
  console.log(props.user);

  const handleLastStep = () => {
    props.lastStep();
    props.completeCallback();
  };

  return (
    <div>
      <h2>รายละเอียดโครงการ</h2>
      <p>ชื่อโครงการ: {props.user.name}</p>
      <p>แปลงที่ดินสำหรับจัดสรร: {props.user.age}</p>
      <br />
      <ActionButtons {...props} lastStep={handleLastStep} />
    </div>
  );
};

const Sample = () => {
  const [stepWizard, setStepWizard] = useState(null);
  const [user, setUser] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const assignStepWizard = (instance) => {
    setStepWizard(instance);
  };

  const assignUser = (val) => {
    console.log("parent receive user callback");
    console.log(val);
    setUser((user) => ({
      ...user,
      ...val
    }));
  };

  const handleStepChange = (e) => {
    console.log("step change");
    console.log(e);
    setActiveStep(e.activeStep - 1);
  };

  const handleComplete = () => {
    alert("ข้อมูลที่คุณต้องการสร้างแฟ้มจัดสรรสำเร็จแล้ว");
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        <Step label="สมัครสมาชิก" children={<MdDescription />} />
        <Step label="ข้อมูลโครงการ" />
        <Step label="ขอใบรับรองหน่วยงานต่างๆ" />
        <Step label="จัดแฟ้ม" />
        <Step label="ตรวจสาธารณูปโภค" />
        <Step label="ขอพ้นหน้าที่บำรุงรักษา" />
        <Step label="จัดตั้งนิติบุคคล" />
      </Stepper>
      {/* NOTE: IMPORTANT !! StepWizard must contains at least 2 children components, else got error */}
      <StepWizard instance={assignStepWizard} onStepChange={handleStepChange}>
        <One userCallback={assignUser} />
        <Two user={user} userCallback={assignUser} />
        <Three user={user} completeCallback={handleComplete} />
      </StepWizard>
    </div>
  );
};

export default Sample;
