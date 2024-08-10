# 3DTilt

`3DTilt` is a React component that adds a 3D tilt effect to any element. It offers various customization options to fine-tune the effect, including tilt angles, perspective, transition speed, and optional glare effects.

## Installation

You can install the `3DTilt` package using npm or Yarn.

### npm

```bash
npm install 3DTilt
```

### yarn

```bash
yarn add 3DTilt
```

## Usage

### Basic Example

```tsx
import React from 'react';
import ThreeDTilt from '3DTilt';

const BasicExample = () => {
  return (
    <ThreeDTilt>
      <div style={{ padding: '50px', background: 'lightblue', borderRadius: '10px' }}>
        <h1>Basic 3D Tilt</h1>
      </div>
    </ThreeDTilt>
  );
};

export default BasicExample;
```

## Options

| Option Name      | Type          | Default Value                              | Description                                                                 |
|------------------|---------------|--------------------------------------------|-----------------------------------------------------------------------------|
| `maxTilt`        | `number`      | `20`                                       | The maximum tilt angle in degrees.                                          |
| `perspective`    | `number`      | `300`                                      | The perspective distance in pixels.                                         |
| `easing`         | `string`      | `'cubic-bezier(.03,.98,.52,.99)'`          | The CSS easing function for transitions.                                    |
| `scale`          | `number`      | `1`                                        | The scaling factor applied to the element when tilted.                      |
| `speed`          | `number`      | `400`                                      | The speed of the transition in milliseconds.                                |
| `transition`     | `boolean`     | `true`                                     | Determines whether transitions should be used.                              |
| `disableAxis`    | `'x' | 'y' | null` | `null`                                 | Disables tilting along the specified axis.                                  |
| `reset`          | `boolean`     | `true`                                     | Resets the tilt effect when the mouse leaves the element.                   |
| `glare`          | `boolean`     | `false`                                    | Adds a glare effect to the element.                                         |
| `maxGlare`       | `number`      | `1`                                        | The maximum opacity of the glare effect.                                    |
| `glarePrerender` | `boolean`     | `false`                                    | Determines whether the glare effect is prerendered.                         |


## Options and Separate Examples

### 1. `maxTilt` (number)

The maximum tilt angle in degrees.

**Default**: `20`

```tsx
import React from 'react';
import ThreeDTilt from '3DTilt';

const MaxTiltExample = () => {
  return (
    <ThreeDTilt options={{ maxTilt: 40 }}>
      <div style={{ padding: '50px', background: 'lightgreen', borderRadius: '10px' }}>
        <h1>Max Tilt: 40°</h1>
      </div>
    </ThreeDTilt>
  );
};

export default MaxTiltExample;
```

### 2. `perspective` (number)

The distance from the viewer to the element, which affects the depth of the 3D effect.

**Default**: `300`

```tsx
import React from 'react';
import ThreeDTilt from '3DTilt';

const PerspectiveExample = () => {
  return (
    <ThreeDTilt options={{ perspective: 1000 }}>
      <div style={{ padding: '50px', background: 'lightcoral', borderRadius: '10px' }}>
        <h1>Perspective: 1000px</h1>
      </div>
    </ThreeDTilt>
  );
};

export default PerspectiveExample;
```

### 3. `easing` (string)

The CSS easing function for the transition effect.

**Default**: `'cubic-bezier(.03,.98,.52,.99)'`

```tsx
import React from 'react';
import ThreeDTilt from '3DTilt';

const EasingExample = () => {
  return (
    <ThreeDTilt options={{ easing: 'linear' }}>
      <div style={{ padding: '50px', background: 'lightsalmon', borderRadius: '10px' }}>
        <h1>Easing: Linear</h1>
      </div>
    </ThreeDTilt>
  );
};

export default EasingExample;
```

### 4. `scale` (number)

The scaling factor applied to the element when it is tilted.

**Default**: `1`

```tsx
import React from 'react';
import ThreeDTilt from '3DTilt';

const ScaleExample = () => {
  return (
    <ThreeDTilt options={{ scale: 1.2 }}>
      <div style={{ padding: '50px', background: 'lightyellow', borderRadius: '10px' }}>
        <h1>Scale: 1.2</h1>
      </div>
    </ThreeDTilt>
  );
};

export default ScaleExample;
```

### 5. `speed` (number)

The speed of the transition in milliseconds.

**Default**: `400`

```tsx
import React from 'react';
import ThreeDTilt from '3DTilt';

const SpeedExample = () => {
  return (
    <ThreeDTilt options={{ speed: 1000 }}>
      <div style={{ padding: '50px', background: 'lightpink', borderRadius: '10px' }}>
        <h1>Speed: 1000ms</h1>
      </div>
    </ThreeDTilt>
  );
};

export default SpeedExample;
```

### 6. `transition` (boolean)

Determines whether transitions should be used.

**Default**: `true`

```tsx
import React from 'react';
import ThreeDTilt from '3DTilt';

const TransitionExample = () => {
  return (
    <ThreeDTilt options={{ transition: false }}>
      <div style={{ padding: '50px', background: 'lightgray', borderRadius: '10px' }}>
        <h1>Transition: Disabled</h1>
      </div>
    </ThreeDTilt>
  );
};

export default TransitionExample;
```

### 7. `disableAxis` (string or null)

Disables tilt on the `'x'` or `'y'` axis.

**Default**: `null`

```tsx
import React from 'react';
import ThreeDTilt from '3DTilt';

const DisableAxisExample = () => {
  return (
    <ThreeDTilt options={{ disableAxis: 'x' }}>
      <div style={{ padding: '50px', background: 'lightcyan', borderRadius: '10px' }}>
        <h1>Disable Axis: X</h1>
      </div>
    </ThreeDTilt>
  );
};

export default DisableAxisExample;
```

### 8. `reset` (boolean)

Resets the tilt effect when the mouse leaves the element.

**Default**: `true`

```tsx
import React from 'react';
import ThreeDTilt from '3DTilt';

const ResetExample = () => {
  return (
    <ThreeDTilt options={{ reset: false }}>
      <div style={{ padding: '50px', background: 'lightgoldenrodyellow', borderRadius: '10px' }}>
        <h1>Reset: Disabled</h1>
      </div>
    </ThreeDTilt>
  );
};

export default ResetExample;
```

### 9. `glare` (boolean)

Adds a glare effect to the element.

**Default**: `false`

```tsx
import React from 'react';
import ThreeDTilt from '3DTilt';

const GlareExample = () => {
  return (
    <ThreeDTilt options={{ glare: true }}>
      <div style={{ padding: '50px', background: 'lightskyblue', borderRadius: '10px' }}>
        <h1>Glare: Enabled</h1>
      </div>
    </ThreeDTilt>
  );
};

export default GlareExample;
```

### 10. `maxGlare` (number)

The maximum opacity of the glare effect.

**Default**: `1`

```tsx
import React from 'react';
import ThreeDTilt from '3DTilt';

const MaxGlareExample = () => {
  return (
    <ThreeDTilt options={{ glare: true, maxGlare: 0.5 }}>
      <div style={{ padding: '50px', background: 'lightsteelblue', borderRadius: '10px' }}>
        <h1>Max Glare: 0.5</h1>
      </div>
    </ThreeDTilt>
  );
};

export default MaxGlareExample;
```

### 11. `glarePrerender` (boolean)

Determines whether the glare effect is prerendered.

**Default**: `false`

```tsx
import React from 'react';
import ThreeDTilt from '3DTilt';

const GlarePrerenderExample = () => {
  return (
    <ThreeDTilt options={{ glare: true, glarePrerender: true }}>
      <div style={{ padding: '50px', background: 'lightseagreen', borderRadius: '10px' }}>
        <h1>Glare Prerender: Enabled</h1>
      </div>
    </ThreeDTilt>
  );
};

export default GlarePrerenderExample;
```

## License

This project is open-source and available under the [MIT License](LICENSE).
