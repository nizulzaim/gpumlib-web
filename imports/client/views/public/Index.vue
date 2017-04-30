<template>
	<div class="background-theme" style="overflow: hidden;" v-wheight>
		<div id="particles-js" style="height: 100%; position: absolute; top: 0; left: 0; width: 100%;"></div>
		<div class="row center-xs middle-xs" style="height: 100%;">
			<div class="col-xs-fluid-24 col-xd-6">
				<cards v-depth="2">
					<form @submit.prevent="login">
						<cards-content>
							<div class="font-light font-center font-headline" style="padding-top: 20px;">Pelangi <span class="font-normal">Apps</span></div>
							<textfield placeholder="Username" v-model="username"></textfield>
							<textfield placeholder="Password" type="password" v-model="password"></textfield>
						</cards-content>
						<divider></divider>
						<cards-action class="background-grey-100">
							<div class="pull-right">
								<color-button type="submit" class="primary"><icon name="key"></icon> Sign In</color-button>
							</div>
						</cards-action>
					</form>
				</cards>
			</div>
		</div>
	</div>
</template>

<script>
 	import "particles.js";
	export default {
		data() {
			return {
				username: "",
				password: "",
			}
		},
		mounted() {
			particlesJS.load('particles-js', '/assets/particles.json', function() {
				console.log('callback - particles-js config loaded');
			});
		},
		methods: {
			login() {
				if (this.username ==="") {
					return this.$snackbar.run("Please enter your username", ()=> {}, "OK", "error");
				}

				if (this.password ==="") {
					return this.$snackbar.run("Please enter your password", ()=> {}, "OK", "error");
				}
				Meteor.loginWithPassword(this.username, this.password, (err)=> {
					if (err) {
						return this.$snackbar.run(err.reason, ()=> {}, "OK", "error");
					}

					this.$snackbar.run("Successfully login", () => {});
					return this.$router.replace("/dashboard/");
				})
			}
		}
	}
</script>