import styles from './Stepper.module.css';

export type Step = {
  label: string;
  description?: string;
  status?: 'complete' | 'current' | 'upcoming';
};

export type StepperProps = {
  steps: Step[];
  currentStep?: number;
  orientation?: 'horizontal' | 'vertical';
};

function resolveStatus(
  index: number,
  currentStep: number,
  explicit?: Step['status'],
): 'complete' | 'current' | 'upcoming' {
  if (explicit) return explicit;
  if (index < currentStep) return 'complete';
  if (index === currentStep) return 'current';
  return 'upcoming';
}

function segmentTone(
  segmentIndex: number,
  currentStep: number,
): 'success' | 'primary' | 'neutral' {
  if (segmentIndex < currentStep) return 'success';
  if (segmentIndex === currentStep) return 'primary';
  return 'neutral';
}

const segmentClassMap = {
  success: styles.segmentSuccess,
  primary: styles.segmentPrimary,
  neutral: styles.segmentNeutral,
} as const;

export const Stepper = ({
  steps,
  currentStep: currentStepProp = 0,
  orientation = 'horizontal',
}: StepperProps) => {
  const n = steps.length;
  const currentStep = Math.min(Math.max(0, currentStepProp), Math.max(0, n - 1));

  const renderCircle = (status: 'complete' | 'current' | 'upcoming', index: number) => {
    const circleClass = [
      styles.circle,
      status === 'complete'
        ? styles.circleComplete
        : status === 'current'
          ? styles.circleCurrent
          : styles.circleUpcoming,
    ].join(' ');

    return (
      <div className={circleClass} aria-current={status === 'current' ? 'step' : undefined}>
        {status === 'complete' ? (
          <span className={styles.check} aria-hidden>
            ✓
          </span>
        ) : (
          <span aria-hidden>{index + 1}</span>
        )}
      </div>
    );
  };

  const renderLabelBlock = (
    step: Step,
    status: 'complete' | 'current' | 'upcoming',
  ) => {
    const labelClass = [
      styles.label,
      status === 'complete'
        ? styles.labelComplete
        : status === 'current'
          ? styles.labelCurrent
          : styles.labelUpcoming,
    ].join(' ');

    return (
      <div className={styles.textBlock}>
        <p className={labelClass}>{step.label}</p>
        {step.description != null ? (
          <p className={styles.description}>{step.description}</p>
        ) : null}
      </div>
    );
  };

  if (orientation === 'vertical') {
    return (
      <nav className={[styles.root, styles.vertical].join(' ')} aria-label="Progress">
        <ol className={styles.list}>
          {steps.map((step, i) => {
            const status = resolveStatus(i, currentStep, step.status);
            const segTone =
              i < n - 1 ? segmentTone(i, currentStep) : null;
            const segClass =
              segTone != null ? segmentClassMap[segTone] : styles.segmentNeutral;

            return (
              <li key={`${step.label}-${i}`} className={styles.vStep}>
                <div className={styles.vLeft}>
                  {renderCircle(status, i)}
                  {i < n - 1 ? (
                    <div className={[styles.vLine, segClass].join(' ')} aria-hidden />
                  ) : null}
                </div>
                <div className={styles.vText}>{renderLabelBlock(step, status)}</div>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  return (
    <nav className={[styles.root, styles.horizontal].join(' ')} aria-label="Progress">
      <ol className={[styles.list, styles.listHorizontal].join(' ')}>
        {steps.map((step, i) => {
          const status = resolveStatus(i, currentStep, step.status);
          const leftTone = i > 0 ? segmentTone(i - 1, currentStep) : null;
          const rightTone = i < n - 1 ? segmentTone(i, currentStep) : null;

          return (
            <li key={`${step.label}-${i}`} className={styles.stepCol}>
              <div className={styles.track}>
                {i > 0 ? (
                  <div
                    className={[
                      styles.segment,
                      leftTone != null
                        ? segmentClassMap[leftTone]
                        : styles.segmentNeutral,
                    ].join(' ')}
                    aria-hidden
                  />
                ) : (
                  <div className={styles.segmentSpacer} aria-hidden />
                )}
                {renderCircle(status, i)}
                {i < n - 1 ? (
                  <div
                    className={[
                      styles.segment,
                      rightTone != null
                        ? segmentClassMap[rightTone]
                        : styles.segmentNeutral,
                    ].join(' ')}
                    aria-hidden
                  />
                ) : (
                  <div className={styles.segmentSpacer} aria-hidden />
                )}
              </div>
              {renderLabelBlock(step, status)}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
