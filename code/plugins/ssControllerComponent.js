// adds better movement && coyote time && jump buffer
export default function ssControllerComponent() {
	return {
		ssController({ moveSpeed = 240, accel = 12, deccel = 8, velPower = 1, friction = 0.9, jumpForce = 480, coyoteTime = 0.1, jumpBufferTime = 0.2, blockTag = "block", useInput = true } = {}) {

			// movement	
			var velocity = 0;
			var targetSpeed = 0;
			var amount;

			// coyoteTime
			var coyoteCount = 0;

			var canJump = false;

			// jump buffer
			var jumpBufferCount = 0;

			// dash
			var dashCooldownTime = 0.5;
			var dashCount = 0;

			return {

				id: "sscontroller",
				require: ["pos", "body"],

				add() {

					this.input = 0;

					this.kinematic = false;

					onKeyPress("space", () => {
						//console.log(canJump + " " + !this.kinematic);
						if (canJump && !this.kinematic) {
							if (this.curPlatform() != null) {
								if (!this.curPlatform().is("spring")) {
									this.jump(jumpForce);
									play("blip");
								}
							}
						} else {
							jumpBufferCount = jumpBufferTime;
						}
					});

					onKeyPress("z", () => {
						//console.log(canJump + " " + !this.kinematic);
						if (canJump && !this.kinematic) {
							if (this.curPlatform() != null) {
								if (!this.curPlatform().is("spring")) {
									this.jump(jumpForce);
									play("blip");
								}
							}
						} else {
							jumpBufferCount = jumpBufferTime;
						}
					});

					/*
					onKeyPress(["r"], () => {
						if (velocity <= moveSpeed && dashCount < 0) {
							velocity *= 10;
							dashCount = dashCooldownTime;
						}
					});
					*/

					this.onPhysicsResolve((c) => {
						if (c.target.is("body")) {
							if (c.target.isStatic)
								if (c) {
									if (c.isRight() && velocity > 0)
										velocity = 0;
									else if (c.isLeft() && velocity < 0)
										velocity = 0;
								} else {
									c.target.move(velocity, 0);
								}
						}
					});

				},

				update() {

					// input
					if (this.kinematic) {
						velocity = 0;
						return;
					}

					if (useInput) {
						this.input = 0;

						if (isKeyDown("a") || isKeyDown("left"))
							this.input -= 1;

						if (isKeyDown("d") || isKeyDown("right"))
							this.input += 1;
					}

					// movement

					targetSpeed = this.input * moveSpeed;

					speedDif = targetSpeed - velocity;

					accelRate = (Math.abs(targetSpeed) > 0.01) ? accel : deccel;

					movement = Math.pow(Math.abs(speedDif) * accelRate, velPower) * Math.sign(speedDif);

					velocity += movement * dt();

					this.move(velocity, 0);

					// friction

					amount = Math.min(Math.abs(velocity), Math.abs(friction));

					amount *= Math.sign(velocity);

					velocity -= amount;

					// coyote time
					if (this.isGrounded()) {
						coyoteCount = coyoteTime;
					} else {
						coyoteCount -= dt();
					}

					if ((coyoteCount > 0 && this.isFalling()) || this.isGrounded())
						canJump = true;
					else
						canJump = false;

					// jump buffer
					if (jumpBufferCount > 0 && canJump) {
						if (this.curPlatform() != null) {
							if (!this.curPlatform().is("spring")) {
								this.jump(jumpForce);
								play("blip");
							}
						}
					} else {
						jumpBufferCount -= dt();
					}

					// dash
					//dashCount -= dt();
				},

				inspect() {
					return "{\n\tInput: " + this.input + "\n\tVelocity: " + (Math.round(velocity * 10) / 10) + "\n\tCoyote: " + (Math.round(coyoteCount * 10) / 10) + "\n\tJump Buffer: " + (Math.round(jumpBufferCount * 10) / 10) + "\n\tCanJump: " + canJump + "\n}";
				},

				// other methods

				getVelocity() {
					return velocity;
				}
			}
		}
	}
}